import { useEffect, useState } from 'react'

function ActiveListCard(props) {
	const [todoList, setTodoList] = useState([])

	useEffect(() => {
		setTodoList(props.cardData)
	}, [props.cardData])

	const completeTask = task => {
		props.completeTaskInParent(task)
	}
	return (
		<div>
			<h2>{props.title}</h2>
			<div>
				{todoList.map(task => (
					<li key={task._id}>
						<input type="hidden" name="id" value={task._id} />
						<button onClick={() => completeTask(task)}>✔</button> {task.title}
					</li>
				))}
			</div>
		</div>
	)
}
export default ActiveListCard
