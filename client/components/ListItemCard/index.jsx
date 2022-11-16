export default function ListItemCard(props) {
	return (
		<div>
			<h2>{props.title}</h2>
			<div>{props.cardData && props.cardData.map(task => <li key={task._id}>✔ {task.title}</li>)}</div>
		</div>
	)
}
