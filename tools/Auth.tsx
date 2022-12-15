import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, database } from '../pages/_app';
import { handleOnChangeUserStatus } from '../redux/currentUserStatus';
import { handleOnChangeCurrentSearch } from '../redux/currentSearchSlice';
import { handleOnChangeFavorites } from '../redux/favoritesSlice';
import { handleOnChangeTheme } from '../redux/themeSlice';
import { child, get, onValue, ref } from 'firebase/database';
import { handleChangeWatching } from '../redux/nowWatchingSlice';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.emailVerified) {
          dispatch(handleOnChangeUserStatus(true));

          get(child(ref(database), `users/${user.uid}/favorites`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                dispatch(handleOnChangeFavorites(Object.values(snapshot.val())));
              } else {
                dispatch(handleOnChangeFavorites(null));
              }
            })
            .catch((error) => {
              console.error(error);
            });

          get(ref(database, 'watching'))
            .then((snapshot) => {
              if (snapshot.exists()) {
                dispatch(handleChangeWatching(snapshot.val()));
              }
            })
            .catch((error) => {
              console.error(error);
            });

          onValue(child(ref(database), `users/${user.uid}/favorites`), (snapshot) => {
            if (snapshot.exists()) {
              dispatch(handleOnChangeFavorites(Object.values(snapshot.val())));
            } else {
              dispatch(handleOnChangeFavorites(null));
            }
          });

          onValue(child(ref(database), `watching`), (snapshot) => {
            if (snapshot.exists()) {
              dispatch(handleChangeWatching(snapshot.val()));
            } else {
              dispatch(handleChangeWatching(null));
            }
          });

          if (
            window.location.pathname !== '/' &&
            !window.location.pathname.includes('show') &&
            window.location.pathname !== '/favorites' &&
            window.location.pathname !== '/topShow'
          ) {
            router.replace('/');
          }
        } else {
          if (window.location.pathname !== '/emailVerification') {
            router.replace('/emailVerification');
          }

          const actionCodeSettings = {
            url:
              process.env.NODE_ENV === 'development'
                ? process.env.NEXT_PUBLIC_HOST_DEV!
                : process.env.NEXT_PUBLIC_HOST_PROD!,
          };
          sendEmailVerification(user, actionCodeSettings).catch((error: Error) =>
            console.error(error.message),
          );
        }
      } else {
        dispatch(handleOnChangeUserStatus(false));
        dispatch(handleOnChangeCurrentSearch(''));
        dispatch(handleOnChangeFavorites(null));
        dispatch(handleOnChangeTheme('light'));
        dispatch(handleChangeWatching(null));

        router.replace('/signIn');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default Auth;
