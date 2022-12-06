import React from 'react';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, database } from '../pages/_app';
import { handleOnChangeUser } from '../redux/currentUser';
import { handleOnChangeCurrentSearch } from '../redux/currentSearchSlice';
import { handleOnChangeFavorites } from '../redux/favoritesSlice';
import { handleOnChangeTheme } from '../redux/themeSlice';
import { child, get, onValue, ref } from 'firebase/database';
import { handleWatching } from '../redux/nowWatchingSlice';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.emailVerified) {
          dispatch(
            handleOnChangeUser({
              uid: user.uid,
              verified: true,
            }),
          );

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

          // get(ref(database, 'watching'))
          //   .then((snapshot) => {
          //     if (snapshot.exists()) {
          //       if (snapshot.val().current !== 'null') {
          //         dispatch(
          //           handleWatching({
          //             userUid: snapshot.val(),
          //             showId: snapshot.val().current.showId,
          //           }),
          //         );
          //       } else {
          //         dispatch(handleWatching(null));
          //       }
          //     }
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });

          onValue(ref(database), (snapshot) => {
            if (snapshot.exists()) {
              if (snapshot.val().users[user.uid]) {
                dispatch(
                  handleOnChangeFavorites(Object.values(snapshot.val().users[user.uid].favorites)),
                );
              }

              // if (snapshot.val().watching?.current) {
              //   dispatch(
              //     handleWatching({
              //       userEmail: snapshot.val().watching.current.userEmail,
              //       showId: snapshot.val().watching.current.showId,
              //     }),
              //   );
              // } else {
              //   dispatch(handleWatching(null));
              // }
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
          };
          sendEmailVerification(user, actionCodeSettings).catch((error: Error) =>
            console.error(error.message),
          );
        }
      } else {
        dispatch(handleOnChangeUser(null));
        dispatch(handleOnChangeCurrentSearch(''));
        dispatch(handleOnChangeFavorites(null));
        dispatch(handleOnChangeTheme('light'));
        dispatch(handleWatching(null));

        router.replace('/signIn');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default Auth;
