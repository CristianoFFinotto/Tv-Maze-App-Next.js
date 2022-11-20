import verifiedUserReducer from './verifiedUserSlice';
import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    verifiedUser: verifiedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
