export default function ActiveListCard(props) {
	return (
		<div>
			<h2>{props.title}</h2>
			<div>
				{props.cardData &&
					props.cardData.map(task => (
						<li key={task._id}>
							<button onClick={() => props.onComplete(task)}>✔</button> {task.title}
						</li>
					))}
			</div>
		</div>
	)
}
