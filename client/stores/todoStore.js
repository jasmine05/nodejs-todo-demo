import { makeAutoObservable, runInAction, toJS } from 'mobx'

export default class TodoStore {
	todos = {}
	isLoading = true

	constructor() {
		makeAutoObservable(this)
	}

	getTodos() {
		return this.todos
	}

	getTotalActiveTodos() {
		const active = toJS(this.todos.active)
		return active && active.length
	}

	// Fetches all Todos from the server.
	async loadTodos() {
		this.isLoading = true
		try {
			const response = await fetch('/api/tasks')
			const tasks = await response.json()
			runInAction(() => {
				this.todos = { ...tasks }
				this.isLoading = false
			})
		} catch (error) {
			runInAction(() => {
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
				this.isLoading = false
			})
		}
	}
}
