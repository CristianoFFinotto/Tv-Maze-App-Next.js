import React from 'react';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, database } from '../pages/_app';
import { handleOnChangeVerifiedUser } from '../redux/verifiedUserSlice';
import { handleOnChangeCurrentSearch } from '../redux/currentSearchSlice';
import { handleOnChangeFavorites } from '../redux/favoritesSlice';
import { handleOnChangeTheme } from '../redux/themeSlice';
import { child, get, onValue, ref } from 'firebase/database';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.emailVerified) {
          dispatch(handleOnChangeVerifiedUser(true));

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

          onValue(child(ref(database), `users/${user.uid}`), (snapshot) => {
            if (snapshot.exists()) {
              dispatch(handleOnChangeFavorites(Object.values(snapshot.val().favorites)));
            } else {
              dispatch(handleOnChangeFavorites(null));
            }
          });

          if (
            window.location.pathname !== '/' &&
            !window.location.pathname.includes('show') &&
            window.location.pathname !== '/favorites'
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
            handleCodeInApp: false,
          };
          sendEmailVerification(user, actionCodeSettings).catch((error: Error) =>
            console.error(error.message),
          );
        }
      } else {
        dispatch(handleOnChangeVerifiedUser(false));
        dispatch(handleOnChangeCurrentSearch(''));
        dispatch(handleOnChangeFavorites(null));
        dispatch(handleOnChangeTheme('light'));

        router.replace('/signIn');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default Auth;
