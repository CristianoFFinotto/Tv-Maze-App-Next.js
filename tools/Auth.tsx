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
import { onValue, ref } from 'firebase/database';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.emailVerified) {
          dispatch(handleOnChangeVerifiedUser(true));

          onValue(ref(database, `/`), (snapshot) => {
            if (snapshot.exists()) {
              dispatch(
                handleOnChangeFavorites(
                  Object.values(snapshot.val().users[auth.currentUser!.uid].favorites),
                ),
              );
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
            url: 'http://localhost:3000',
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
  }, []);
  return <></>;
};

export default Auth;
