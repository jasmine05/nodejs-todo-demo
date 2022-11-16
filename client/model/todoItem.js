import { action, makeAutoObservable, observable, reaction } from 'mobx'

export class Todo {
	id = null // Unique id of this Todo, immutable.
	title = ''
	completed = false

	constructor() {
		makeAutoObservable(this, {
			title: observable,
			completed: observable,
			updateTitle: action,
			updateCompleted: action,
		})
	}

	updateTitle(title) {
		this.title = title
	}

	updateCompleted(completed) {
		this.completed = completed
	}

	// Update this Todo with information from the server.
	updateFromJson(json) {
		this.id = id
		this.title = json.title
		this.completed = json.completed
	}

	get asJson() {
		return {
			id: this.id,
			completed: this.completed,
			title: this.task,
		}
	}
}
