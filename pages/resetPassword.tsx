import React from 'react';
import { useState } from 'react';
import { Alert, AlertTitle, Grid, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Form from '../components/Form';
import Header from '../components/Header';
import { auth } from './_app';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { RootState } from '../redux/store';
import { Inputs } from '../tools/Types';

const ResetPassword = () => {
  const [resetPasswordSend, setresetPasswordSend] = useState<boolean>(false);
  const [resetPasswordError, setResetPasswordError] = useState<string>('');
  const verifiedUser = useSelector((state: RootState) => state.currentUserVerified.value);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/signIn',
      handleCodeInApp: false,
    };

    sendPasswordResetEmail(auth, data.email, actionCodeSettings)
      .then(() => setresetPasswordSend(true))
      .catch((error: Error) => setResetPasswordError(error.message.slice(10)));
  };

  return (
    <>
      {!verifiedUser ? (
        <>
          <Header
            title={'Tv Maze App - Password reset'}
            description={'Tv Maze App - Password reset'}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3' gutterBottom textAlign={'center'} marginTop={'3vh'}>
                Password reset
              </Typography>
            </Grid>
            <Grid item xs={12} marginTop={'24vh'} display={'flex'} justifyContent={'center'}>
              <Form onSubmit={onSubmit} hasPasswordInput={false} errors={resetPasswordError} />
              {resetPasswordSend ? (
                <Alert severity='info' sx={{ position: 'absolute', bottom: '1vh' }}>
                  <AlertTitle>Info</AlertTitle>
                  Reset password link is sent to your mail.
                  <br />
                  <strong>If you not find it, check into spam.</strong>
                </Alert>
              ) : undefined}
            </Grid>
          </Grid>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ResetPassword;
