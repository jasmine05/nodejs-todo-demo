import { inject, observer } from 'mobx-react'
import { useState, useEffect, useCallback } from 'react'
import CreateItemCard from './components/CreateItemCard'
import ListItemCard from './components/ListItemCard'
import ActiveListCard from './components/PendingListCard'
import './styles.css'

function App(props) {
	const types = ['open', 'complete']
	const [activeTab, setActiveTab] = useState(types[0])
	const [active, setActive] = useState([])
	const [completed, setCompleted] = useState([])
	const { todoStore } = props.rootStore

	useEffect(() => {
		loadTasks()
	}, [])

	const loadTasks = async () => {
		await todoStore.loadTodos()
		setActive(todoStore.getActive())
		setCompleted(todoStore.getComplete())
	}

	const createTask = async title => {
		await todoStore.createTask({ title: title })
		loadTasks()
	}

	const completeTask = async task => {
		await todoStore.completeATask({ id: task._id })
		loadTasks()
	}

	const tabPanel = () => {
		return (
			<>
				<div>
					{types.map(type => (
						<Tab
							key={type}
							active={active === type}
							onClick={() => {
								setActive(type)
								dispatch(FILTER(active))
							}}
						>
							{type}
						</Tab>
					))}
				</div>
				<div className="cardOutline">something!</div>
			</>
		)
	}

	return (
		<div className="container">
			{todoStore.isLoading && <h1> is Loading... </h1>}
			<h2>A Simple ToDo List App</h2>
			{/* <div>{tabPanel()}</div> */}
			<CreateItemCard title="Add Tasks" createTaskInParent={title => createTask(title)} />
			<ActiveListCard title="Pending Tasks" cardData={active} completeTaskInParent={task => completeTask(task)} />
			<ListItemCard title="Completed Tasks" cardData={completed} />
		</div>
	)
}

export default inject('rootStore')(observer(App))
