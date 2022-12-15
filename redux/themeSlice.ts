import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'light',
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    handleOnChangeTheme: (state, action: { type: string; payload: string }) => {
      if (action.payload) {
        state.value = action.payload;
      } else if (state.value === 'light') {
        state.value = 'dark';
      } else {
        state.value = 'light';
      }
    },
  },
});

export const { handleOnChangeTheme } = themeSlice.actions;

export default themeSlice.reducer;
