import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task, TaskFilters, CreateTaskRequest, UpdateTaskRequest } from '../../types';
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3001/' }),  tagTypes: ['Task'],
  endpoints: build => ({
    getTasks: build.query<Task[], TaskFilters>({
      query: params => ({ url: 'tasks', params }),
      providesTags: (items = []) => [{ type: 'Task', id: 'LIST' }, ...items.map(({ id }) => ({ type: 'Task' as const, id }))],
    }),
    getTask: build.query<Task, string>({
      query: id => `tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Task', id }],
    }),
    addTask: build.mutation<Task, CreateTaskRequest>({
      query: body => ({ url: 'tasks', method: 'POST', body }),
      invalidatesTags: (_result, error) => error ? [] : [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: build.mutation<Task, UpdateTaskRequest>({
      query: ({ id, ...body }) => ({ url: `tasks/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, error, { id }) => error ? [] : [{ type: 'Task', id }, { type: 'Task', id: 'LIST' }],
    }),
    deleteTask: build.mutation<void, string>({
      query: id => ({ url: `tasks/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, error, id) => error ? [] : [{ type: 'Task', id }, { type: 'Task', id: 'LIST' }],
    }),
  }),
});
export const { useGetTasksQuery, useGetTaskQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;
