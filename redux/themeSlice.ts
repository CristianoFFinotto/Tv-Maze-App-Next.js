import { createSlice } from '@reduxjs/toolkit';

export type ThemeType = {
  value: string;
};

const initialState: ThemeType = {
  value: 'light',
};

export const themeSlice = createSlice({
  name: 'currentSearch',
  initialState,
  reducers: {
    handleOnChangeTheme: (state, action: { type: string }) => {
      if (state.value === 'light') state.value = 'dark';
      else state.value = 'light';
    },
  },
});

export const { handleOnChangeTheme } = themeSlice.actions;

export default themeSlice.reducer;