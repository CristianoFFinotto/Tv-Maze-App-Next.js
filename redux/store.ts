import authCurrentStatusSliceReducer from './authCurrentStatus';
import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    authCurrentStatus: authCurrentStatusSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
