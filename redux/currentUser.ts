import { createSlice } from '@reduxjs/toolkit';

type UserType = {
  uid: string;
  verified: boolean;
};

export type CurrentUserType = {
  value: UserType | null;
};

const initialState: CurrentUserType = {
  value: null,
};

export const currentUserSlice = createSlice({
  name: 'currentUserSlice',
  initialState,
  reducers: {
    handleOnChangeUser: (state, action: { type: string; payload: UserType | null }) => {
      state.value = action.payload;
    },
  },
});

export const { handleOnChangeUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
