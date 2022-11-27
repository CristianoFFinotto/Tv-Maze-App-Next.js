import { createSlice } from '@reduxjs/toolkit';

export type CurrentSearchType = {
  value: string;
};

const initialState: CurrentSearchType = {
  value: '',
};

export const currentSearchSlice = createSlice({
  name: 'verifiedUser',
  initialState,
  reducers: {
    handleOnChangeCurrentSearch: (state, action: { type: string; payload: string }) => {
      state.value = action.payload;
    },
  },
});

export const { handleOnChangeCurrentSearch } = currentSearchSlice.actions;

export default currentSearchSlice.reducer;
