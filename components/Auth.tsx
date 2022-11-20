import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../pages/_app';
import { handleOnChangeVerifiedUser } from '../redux/verifiedUserSlice';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.emailVerified) {
          if (window.location.pathname !== '/' && !window.location.pathname.includes('show')) {
            router.replace('/');
          }
          dispatch(handleOnChangeVerifiedUser(true));
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
        router.replace('/signIn');
        dispatch(handleOnChangeVerifiedUser(false));
      }
    });
  }, []);
  return <></>;
};

export default Auth;