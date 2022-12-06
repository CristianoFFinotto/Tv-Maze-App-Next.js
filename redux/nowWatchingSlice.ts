import { createSlice } from '@reduxjs/toolkit';

type watchingType = {
  userId: string;
  showId: string;
};

export type NowWatchingType = {
  value: watchingType | null;
};

const initialState: NowWatchingType = { value: null };

export const nowWatchingSlice = createSlice({
  name: 'nowWatchingSlice',
  initialState,
  reducers: {
    handleWatching: (
      state: NowWatchingType,
      action: { type: string; payload: watchingType | null },
    ) => {
      state.value = action.payload;
    },
  },
});

export const { handleWatching } = nowWatchingSlice.actions;

export default nowWatchingSlice.reducer;
