import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from './themeSlice';
import currentUserReducer from './currentUser';
import currentSearchReducer from './currentSearchSlice';
import favoritesReducer from './favoritesSlice';
import nowWatchingReducer from './nowWatchingSlice';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    currentUser: currentUserReducer,
    currentSearch: currentSearchReducer,
    favorites: favoritesReducer,
    nowWatching: nowWatchingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
