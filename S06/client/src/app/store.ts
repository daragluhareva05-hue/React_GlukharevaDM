import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import uiReducer from '../features/ui/uiSlice';
import { usersMiddleware } from '../features/users/usersMiddleware';
import { tasksApi } from '../features/tasks/tasksApi';
export const store = configureStore({
  reducer: { users: usersReducer, ui: uiReducer, [tasksApi.reducerPath]: tasksApi.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersMiddleware, tasksApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
