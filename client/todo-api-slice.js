// Need to use the React-specific entry point to import createApi
// instead of fetch use fetchBaseQuery
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const todoApiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Todos'],
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		jsonContentType: 'application/json',
	}),
	endpoints: builder => ({
		getToDo: builder.query({
			query: () => `/tasks`,
			providesTags: ['Todos'],
		}),
		createToDo: builder.mutation({
			query: body => ({
				url: '/create-task',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Todos'],
		}),
		completeToDo: builder.mutation({
			query: body => ({
				url: '/complete-task',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Todos'],
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetToDoQuery, useCreateToDoMutation, useCompleteToDoMutation } = todoApiSlice
