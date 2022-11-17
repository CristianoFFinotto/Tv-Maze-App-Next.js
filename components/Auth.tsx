import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../pages/_app';
import { handleOnChangeCurrentAuth } from '../redux/authCurrentStatus';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        if (user?.emailVerified) {
          console.log('spostami 1');
          console.log(window.location.pathname);
          if (router.pathname !== '/') {
            console.log('spostami 2');
            router.replace('/');
          }
          dispatch(handleOnChangeCurrentAuth(true));
        } else {
          const actionCodeSettings = {
            url: 'http://localhost:3000/signIn',
            handleCodeInApp: false,
          };
          sendEmailVerification(user, actionCodeSettings)
            .then(() => console.log('email sent'))
            .catch((error: Error) => console.log(error.message));
          router.replace('/emailVerification');
        }
      } else {
        router.replace('/signIn');
        dispatch(handleOnChangeCurrentAuth(false));
      }
    });
  }, []);
  return <></>;
};

export default Auth;
