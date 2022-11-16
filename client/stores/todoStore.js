import { makeAutoObservable, runInAction } from 'mobx'

export default class TodoStore {
	todosObj = {}
	isLoading = true
	status = ''
	constructor() {
		makeAutoObservable(this)
	}

	getTodos() {
		return this.todosObj
	}
	getActive() {
		return this.todosObj.active
	}
	getComplete() {
		return this.todosObj.completed
	}

	// Fetches all Todos from the server.
	async loadTodos() {
		console.log('loading')
		this.isLoading = true

		try {
			const response = await fetch('/api/tasks')
			const tasks = await response.json()
			this.todosObj = { ...tasks }
			runInAction(() => {
				this.isLoading = false
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.isLoading = false
			})
		}
	}

	async completeATask(task) {
		this.isLoading = true
		try {
			await fetch('/api/complete-task', {
				method: 'post',
				body: JSON.stringify(task),
				headers: { 'Content-Type': 'application/json' },
			})
			runInAction(() => {
				this.isLoading = false
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.isLoading = false
			})
		}
	}

	async createTask(task) {
		this.isLoading = true
		try {
			await fetch('/api/create-task', {
				method: 'post',
				body: JSON.stringify(task),
				headers: { 'Content-Type': 'application/json' },
			})
			runInAction(() => {
				this.isLoading = false
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.isLoading = false
			})
		}
	}
}
