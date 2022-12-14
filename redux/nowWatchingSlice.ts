import { createSlice } from '@reduxjs/toolkit';

type watchingType = {
  [key: string]: { id: string; showName: string; users: string };
};

export type NowWatchingType = {
  value: watchingType | null;
};

const initialState: NowWatchingType = { value: null };

export const nowWatchingSlice = createSlice({
  name: 'nowWatchingSlice',
  initialState,
  reducers: {
    handleChangeWatching: (
      state: NowWatchingType,
      action: { type: string; payload: watchingType | null },
    ) => {
      state.value = action.payload;
    },
  },
});

export const { handleChangeWatching } = nowWatchingSlice.actions;

export default nowWatchingSlice.reducer;
