import { useEffect, useState } from 'react'

function ListItemCard(props) {
	const [todoList, setTodoList] = useState([])

	useEffect(() => {
		setTodoList(props.cardData)
	}, [props.cardData])

	return (
		<div>
			<h2>{props.title}</h2>
			<div>
				{todoList.map(task => (
					<li key={task._id}>✔ {task.title}</li>
				))}
			</div>
		</div>
	)
}

export default ListItemCard
