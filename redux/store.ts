import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from './themeSlice';
import verifiedUserReducer from './verifiedUserSlice';
import currentSearchReducer from './currentSearchSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    verifiedUser: verifiedUserReducer,
    currentSearch: currentSearchReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
