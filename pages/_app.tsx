import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Theme from '../components/Theme';
import ErrorBoundary from '../components/ErrorBoundary';
import Auth from '../tools/Auth';
import { getDatabase } from 'firebase/database';
import Favorites from '../tools/Favorites';

const firebaseConfig = {
  apiKey: 'AIzaSyAY_kBZ9Dbaux2HdNqa9SElZUl_3R5pv20',
  authDomain: 'tv-maze-app-7b398.firebaseapp.com',
  databaseURL: 'https://tv-maze-app-7b398-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tv-maze-app-7b398',
  storageBucket: 'tv-maze-app-7b398.appspot.com',
  messagingSenderId: '831479367282',
  appId: '1:831479367282:web:86756c13834ae97f6f24eb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

const App = ({ Component, pageProps }: any) => {
  return (
    <Provider store={store}>
      <Theme>
        <ErrorBoundary>
          <Auth />
          <Favorites />
          <Component {...pageProps} />
        </ErrorBoundary>
      </Theme>
    </Provider>
  );
};

export default App;
