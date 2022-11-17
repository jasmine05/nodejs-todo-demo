import { configureStore } from '@reduxjs/toolkit'
import { todoApiSlice } from './todo-api-slice'
import { todoSlice } from './todo-slice'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[todoApiSlice.reducerPath]: todoApiSlice.reducer,
		todo: todoSlice.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApiSlice.middleware),
})
setupListeners(store.dispatch)
export default store
