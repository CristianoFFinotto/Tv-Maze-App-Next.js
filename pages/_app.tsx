import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Theme from '../components/Theme';

const firebaseConfig = {
  apiKey: 'AIzaSyAY_kBZ9Dbaux2HdNqa9SElZUl_3R5pv20',
  authDomain: 'tv-maze-app-7b398.firebaseapp.com',
  projectId: 'tv-maze-app-7b398',
  storageBucket: 'tv-maze-app-7b398.appspot.com',
  messagingSenderId: '831479367282',
  appId: '1:831479367282:web:86756c13834ae97f6f24eb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/* signInWithEmailAndPassword(auth, 'manganaruto715@gmail.com', 'lezzo12')
  .then((userCredential) => {
    console.log(userCredential.user);
  })
  .catch((error) => {
    console.log(error);
  }); */

const App = ({ Component, pageProps }: any) => {
  return (
    <Provider store={store}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </Provider>
  );
};

export default App;
