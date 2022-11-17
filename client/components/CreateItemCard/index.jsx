import { useState } from 'react'

function CreateItemCard(props) {
	const [title, setTitle] = useState([])

	return (
		<div>
			<h2>{props.title}</h2>
			<div>
				<input
					type="text"
					value={title}
					name="title"
					onChange={e => setTitle(e.target.value)}
					placeholder="add new task"
				/>
				<button
					onClick={() => {
						props.onCreateTask(title)
						setTitle('')
					}}
				>
					Add Task
				</button>{' '}
			</div>
		</div>
	)
}

export default CreateItemCard
