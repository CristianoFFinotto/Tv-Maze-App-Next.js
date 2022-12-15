import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from './themeSlice';
import currentUserStatusReducer from './currentUserStatus';
import currentSearchReducer from './currentSearchSlice';
import favoritesReducer from './favoritesSlice';
import nowWatchingReducer from './nowWatchingSlice';

export const store = configureStore({
  reducer: {
    currentTheme: themeSliceReducer,
    currentUserVerified: currentUserStatusReducer,
    currentSearch: currentSearchReducer,
    currentFavorites: favoritesReducer,
    currentWatching: nowWatchingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
