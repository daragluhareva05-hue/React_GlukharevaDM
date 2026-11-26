import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const uiSlice = createSlice({
  name: 'ui', initialState: { favoriteUserIds: [] as string[] },
  reducers: {
    toggleFavorite(state, { payload: id }: PayloadAction<string>) {
      const ids = state.favoriteUserIds;
      state.favoriteUserIds = ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id];
    },
  },
});
export const { toggleFavorite } = uiSlice.actions;
export default uiSlice.reducer;
