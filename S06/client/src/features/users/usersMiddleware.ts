import type { Middleware, Dispatch } from '@reduxjs/toolkit';
import type { LoadingStatus } from '../../types';
import { usersRequested, usersLoading, usersLoaded, usersFailed } from './usersSlice';
import type { User } from '../../types';
async function loadUsers(dispatch: Dispatch) {
  const requestId = crypto.randomUUID();
  dispatch(usersLoading(requestId));
  try {
    const response = await fetch('http://127.0.0.1:3001/users');    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const items: User[] = await response.json();
    dispatch(usersLoaded({ requestId, items }));
  } catch (error) {
    dispatch(usersFailed({ requestId, message: String(error) }));
  }
}
export const usersMiddleware: Middleware<object, { users: { status: LoadingStatus } }> = api => next => action => {
  const result = next(action);
  if (usersRequested.match(action) && api.getState().users.status !== 'loading') {
    void loadUsers(api.dispatch);
  }
  return result;
};
