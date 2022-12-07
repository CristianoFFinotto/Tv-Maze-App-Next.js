import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const currentSearchSlice = createSlice({
  name: 'currentSearchSlice',
  initialState,
  reducers: {
    handleOnChangeCurrentSearch: (state, action: { type: string; payload: string }) => {
      state.value = action.payload;
    },
  },
});

export const { handleOnChangeCurrentSearch } = currentSearchSlice.actions;

export default currentSearchSlice.reducer;
