import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const currentUserVerified = createSlice({
  name: 'currentUserVerified',
  initialState,
  reducers: {
    handleOnChangeUserStatus: (state, action: { type: string; payload: boolean }) => {
      state.value = action.payload;
    },
  },
});

export const { handleOnChangeUserStatus } = currentUserVerified.actions;

export default currentUserVerified.reducer;
