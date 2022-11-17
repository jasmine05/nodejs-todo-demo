import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		value: 0,
	},
	// logic and updates definition
	reducers: {
		incremented(state) {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			// (action.payload)
			state.value++
		},
	},
})

// Action creators are generated for each case reducer function
export const { incremented } = todoSlice.actions

export default todoSlice.reducer
