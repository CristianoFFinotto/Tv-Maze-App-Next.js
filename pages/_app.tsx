import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Theme from '../components/Theme';
import ErrorBoundary from '../components/ErrorBoundary';
import Auth from '../tools/Auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_databaseURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
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
          <Component {...pageProps} />
        </ErrorBoundary>
      </Theme>
    </Provider>
  );
};

export default App;
