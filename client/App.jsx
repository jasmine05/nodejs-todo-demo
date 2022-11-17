import { useState, useEffect } from 'react'
import CreateItemCard from './components/CreateItemCard'
import ListItemCard from './components/ListItemCard'
import ActiveListCard from './components/PendingListCard'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { incremented } from './todo-slice'
import { useCompleteToDoMutation, useCreateToDoMutation, useGetToDoQuery } from './todo-api-slice'

function App(props) {
	const types = ['active', 'complete']
	const [activeTab, setActiveTab] = useState(types[0])

	// const value = useSelector(state => state.todo.value)
	// const dispatch = useDispatch()

	const { data: allTodos, isLoading, isSuccess, isError } = useGetToDoQuery()
	const [createToDo] = useCreateToDoMutation()
	const [completeToDo] = useCompleteToDoMutation()

	// const ACTIVE_MOCK_DATA = [
	// 	{ _id: '1', title: 'one' },
	// 	{ _id: '2', title: 'two' },
	// 	{ _id: '3', title: 'three' },
	// ]
	// const COMPLETED_MOCK_DATA = [
	// 	{ _id: '4', title: 'four' },
	// 	{ _id: '5', title: 'five' },
	// 	{ _id: '6', title: 'six' },
	// ]
	// const ALL_TODOS_MOCK_DATA = {
	// 	active: ACTIVE_MOCK_DATA,
	// 	completed: COMPLETED_MOCK_DATA,
	// }

	const incrementValue = () => {
		dispatch(incremented())
	}

	const createTask = async title => {
		createToDo({ title })
	}

	const completeTask = async task => {
		completeToDo({ id: task._id })
	}

	const tabPanel = () => {
		return (
			<Tabs>
				<TabList>
					{types.map(type => (
						<Tab
							key={type}
							active={activeTab}
							onClick={() => {
								setActiveTab(type)
							}}
						>
							{type}
						</Tab>
					))}
				</TabList>
				<TabPanel>
					<ActiveListCard
						title="Active Tasks"
						cardData={allTodos ? allTodos.active : []}
						onCompleteTask={task => completeTask(task)}
					/>
				</TabPanel>
				<TabPanel>
					<ListItemCard title="Completed Tasks" cardData={allTodos ? allTodos.completed : []} />
				</TabPanel>
			</Tabs>
		)
	}

	let content
	if (isLoading) {
		content = <p> Data loading... </p>
	} else if (isSuccess) {
		content = <div>{tabPanel()}</div>
	} else if (isError) {
		content = <p>Houston, we have a problem!</p>
	}

	return (
		<div className="container">
			<CreateItemCard title="Add Tasks" onCreateTask={title => createTask(title)} />
			<h2>A Simple ToDo List App</h2>
			<div>{content}</div>
			<h1>VALUE HERE: {value}</h1>
			<button onClick={() => incrementValue()}>INCREMENT HERE</button>
		</div>
	)
}

export default App
