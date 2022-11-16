import TodoStore from './todoStore'
import UserStore from './userStore'

export default class RootStore {
	constructor() {
		this.userStore = new UserStore(this)
		this.todoStore = new TodoStore(this)
	}
}
