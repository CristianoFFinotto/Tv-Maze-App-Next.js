import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { auth } from './_app';
import Form, { Inputs } from '../components/Form';
import MyButton from '../components/MyButton';
import Loading from '../components/Loading';
import Header from '../components/Header';

const SignIn = () => {
  const [alertState, setAlertState] = useState(true);
  const [SignInError, setSignInError] = useState<string>('');
  const [verificationEmailSent, setVerificationEmailSent] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser?.emailVerified) router.push('/');
  }, []);

  if (auth.currentUser?.emailVerified) return <Loading />;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (res) => {
        if (res.user.emailVerified) router.push('/');
        else {
          const actionCodeSettings = {
            url: 'http://localhost:3000/signIn',
            handleCodeInApp: false,
          };
          await sendEmailVerification(res.user, actionCodeSettings)
            .then(() => {
              setVerificationEmailSent(true);
              setAlertState(true);
            })
            .catch((error: Error) => {
              setSignInError(error.message.slice(10));
              setAlertState(true);
            });
        }
      })
      .catch((error: Error) => {
        setSignInError(error.message.slice(10));
        setAlertState(true);
      });
  };

  const handleOnResetClick = (e: Event) => {
    e.preventDefault();
    router.push('/resetPassword');
  };

  return (
    <>
      <Header title={'Tv Maze App - Sign in'} description={'Tv Maze App - Sign in'} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3' gutterBottom textAlign={'center'} marginTop={'3vh'}>
            Sign in
          </Typography>
        </Grid>
        <Grid item xs={12} marginTop={'24vh'} display={'flex'} justifyContent={'center'}>
          <Form
            onSubmit={onSubmit}
            hasPasswordInput={true}
            errors={SignInError}
            alertState={alertState}
            setAlertState={setAlertState}
            verificationEmailSent={verificationEmailSent}
          />
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          or
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <a href=''>
            <MyButton handleOnClick={handleOnResetClick}>Reset password</MyButton>
          </a>
          <Link href={'/signUp'}>
            <MyButton>Sign Up</MyButton>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
