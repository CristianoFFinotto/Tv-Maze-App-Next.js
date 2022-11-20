import { createSlice } from '@reduxjs/toolkit';

export type VerifiedUserType = {
  value: boolean;
};

const initialState: VerifiedUserType = {
  value: false,
};

export const verifiedUserSlice = createSlice({
  name: 'verifiedUser',
  initialState,
  reducers: {
    handleOnChangeVerifiedUser: (state, action: { type: string; payload: boolean }) => {
      state.value = action.payload;
    },
  },
});

export const { handleOnChangeVerifiedUser } = verifiedUserSlice.actions;

export default verifiedUserSlice.reducer;
