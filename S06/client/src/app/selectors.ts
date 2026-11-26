import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';
export const selectUsers = (state: RootState) => state.users.items;
export const selectUserById = (state: RootState, id: string) => selectUsers(state).find(user => user.id === id);
export const selectFavoriteIds = (state: RootState) => state.ui.favoriteUserIds;
export const selectFavoriteCount = (state: RootState) => selectFavoriteIds(state).length;
export const selectFavorites = createSelector([selectUsers, selectFavoriteIds], (users, ids) => users.filter(user => ids.includes(user.id)));
