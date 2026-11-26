import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, LoadingStatus } from '../../types';
interface UsersState { items: User[]; status: LoadingStatus; error: string | null; requestId: string | null }
const initialState: UsersState = { items: [], status: 'idle', error: null, requestId: null };
export const usersRequested = createAction('users/requested');
const usersSlice = createSlice({
  name: 'users', initialState,
  reducers: {
    usersLoading(state, { payload }: PayloadAction<string>) {
      state.status = 'loading'; state.error = null; state.requestId = payload;
    },
    usersLoaded(state, { payload }: PayloadAction<{ requestId: string; items: User[] }>) {
      if (state.requestId !== payload.requestId) return;
      state.items = payload.items; state.status = 'succeeded';
    },
    usersFailed(state, { payload }: PayloadAction<{ requestId: string; message: string }>) {
      if (state.requestId !== payload.requestId) return;
      state.error = payload.message; state.status = 'failed';
    },
  },
});
export const { usersLoading, usersLoaded, usersFailed } = usersSlice.actions;
export default usersSlice.reducer;
