export default class UserStore {
	constructor(rootStore) {
		this.rootStore = rootStore
	}

	getTodos(user) {
		// Access todoStore through the root store.
		// return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
	}
}
