import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { auth } from './_app';
import Form from '../components/Form';
import MyButton from '../components/MyButton';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Inputs } from '../tools/Types';

const SignIn = () => {
  const [SignInError, setSignInError] = useState<string>('');
  const verifiedUser = useSelector((state: RootState) => state.currentUserVerified.value);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password).catch((error: Error) =>
      setSignInError(error.message.slice(10)),
    );
  };

  const handleOnResetClick = () => {
    router.replace('/resetPassword');
  };

  return (
    <>
      {!verifiedUser ? (
        <>
          <Header title={'Tv Maze App - Sign in'} description={'Tv Maze App - Sign in'} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3' gutterBottom textAlign={'center'} marginTop={'3vh'}>
                Sign in
              </Typography>
            </Grid>
            <Grid item xs={12} marginTop={'24vh'} display={'flex'} justifyContent={'center'}>
              <Form onSubmit={onSubmit} hasPasswordInput={true} errors={SignInError} />
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              or
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <span style={{ textDecoration: 'underline' }}>
                <MyButton handleOnClick={() => handleOnResetClick()}>Reset password</MyButton>
              </span>

              <Link href={'/signUp'}>
                <MyButton>Sign Up</MyButton>
              </Link>
            </Grid>
          </Grid>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SignIn;
