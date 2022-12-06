import { createSlice } from '@reduxjs/toolkit';

export type FavoritesType = string[] | null;

export type FavoritesSliceType = {
  value: FavoritesType;
};

const initialState: FavoritesSliceType = {
  value: null,
};

export const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState,
  reducers: {
    handleOnChangeFavorites: (state, action: { type: string; payload: FavoritesType }) => {
      state.value = action.payload;
    },
  },
});

export const { handleOnChangeFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
