import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Form from '../components/Form';
import { auth } from './_app';
import { Inputs } from '../components/Form';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SignUp = () => {
  const [signUpError, setSignUpError] = useState<string>('');
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password).catch((error: Error) =>
      setSignUpError(error.message.slice(10)),
    );
  };

  return (
    <>
      {!verifiedUser ? (
        <>
          <Header title={'Tv Maze App - Sign up'} description={'Tv Maze App - Sign up'} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3' gutterBottom textAlign={'center'} marginTop={'3vh'}>
                Sign up
              </Typography>
            </Grid>
            <Grid item xs={12} marginTop={'24vh'} display={'flex'} justifyContent={'center'}>
              <Form onSubmit={onSubmit} hasPasswordInput={true} errors={signUpError} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SignUp;
