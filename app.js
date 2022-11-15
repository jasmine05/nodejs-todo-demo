//dependencies required for the app
var express = require('express')
var bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const MONGODB_URL = process.env.MONGODB_URL

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
//render css files
app.use(express.static('public'))

//post route for adding new task
app.post('/addtask', async function (req, res) {
	var input = req.body.newtask

	var doc

	if (testJSON(input)) {
		doc = JSON.parse(input)
	} else {
		if (input == '') {
			res.redirect('/')
			return
		}
		doc = {}
		doc.input = input
	}

	console.log(doc)

	const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	const coll = client.db('faber').collection('todos')
	const result = await coll.insertOne(doc)
	console.log(result)
	await client.close()

	res.redirect('/')
})

app.post('/removetask', async function (req, res) {
	var input = req.body.check || null

	if (input == null) {
		res.redirect('/')
		return
	}

	console.log(req.body.check)
	let todoString = req.body.check
	let todo = JSON.parse(todoString)

	console.log(todo._id)

	const objId = new ObjectId(todo._id)

	const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

	const coll = client.db('faber').collection('todos')
	const result = await coll.findOne({ _id: objId })

	console.log(result)

	const updated = await coll.updateOne(
		{ _id: objId },
		{
			$set: {
				status: 'FINISHED',
			},
		}
	)

	console.log(updated)

	await client.close()

	console.log(result)

	res.redirect('/')
})

//render the ejs and display added task, completed task
app.get('/', async function (req, res) {
	var validTodos = await getValidToDos()
	var completeTodos = await getFinishedToDos()

	res.render('index', { task: validTodos, complete: completeTodos })
})

//set app to listen on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log('server is running on port ', process.env.PORT || 3000)
})

async function getValidToDos() {
	const agg = [
		{
			$limit: 10,
		},
		// {
		//   '$project': {
		//     '_id': 0
		//   }
		// },
		{
			$match: {
				status: {
					$ne: 'FINISHED',
				},
			},
		},
	]

	const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	const coll = client.db('faber').collection('todos')
	const cursor = coll.aggregate(agg)
	const result = await cursor.toArray()
	await client.close()

	var ejsResult = []
	result.forEach(el => {
		let id = el._id
		delete el._id
		el._id = id
		ejsResult.push(JSON.stringify(el))
	})
	return ejsResult
}

async function getFinishedToDos() {
	const agg = [
		{
			$limit: 10,
		},
		{
			$project: {
				_id: 0,
			},
		},
		{
			$match: {
				status: 'FINISHED',
			},
		},
		{
			$project: {
				status: 0,
			},
		},
	]

	const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	const coll = client.db('faber').collection('todos')
	const cursor = coll.aggregate(agg)
	const result = await cursor.toArray()
	await client.close()

	var ejsResult = []
	result.forEach(el => {
		ejsResult.push(JSON.stringify(el))
	})
	return ejsResult
}

function testJSON(text) {
	if (typeof text !== 'string') {
		return false
	}
	try {
		var json = JSON.parse(text)
		return typeof json === 'object'
	} catch (error) {
		return false
	}
}
