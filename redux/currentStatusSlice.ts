import { createSlice } from '@reduxjs/toolkit';

export type CurrentAuthStatusType = {
  value: boolean;
};

const initialState: CurrentAuthStatusType = {
  value: false,
};

export const currentStatusSlice = createSlice({
  name: 'currentAuthStatus',
  initialState,
  reducers: {
    handleOnChangeCurrentAuth: (state, action: { type: string; payload: boolean }) => {
      state.value = action.payload;
    },
  },
});

export const { handleOnChangeCurrentAuth } = currentStatusSlice.actions;

export default currentStatusSlice.reducer;
