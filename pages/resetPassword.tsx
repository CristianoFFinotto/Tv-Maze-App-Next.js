import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Form, { Inputs } from '../components/Form';
import Header from '../components/Header';
import { auth } from './_app';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { RootState } from '../redux/store';

const ResetPassword = () => {
  const [resetPasswordError, setResetPasswordError] = useState<string>('');
  const authCurrentStatus = useSelector((state: RootState) => state.authCurrentStatus.value);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/signIn',
      handleCodeInApp: false,
    };

    sendPasswordResetEmail(auth, data.email, actionCodeSettings).catch((error: Error) =>
      setResetPasswordError(error.message.slice(10)),
    );
  };

  if (authCurrentStatus) return <Loading />;

  return (
    <>
      <Header title={'Tv Maze App - Password reset'} description={'Tv Maze App - Password reset'} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3' gutterBottom textAlign={'center'} marginTop={'3vh'}>
            Password reset
          </Typography>
        </Grid>
        <Grid item xs={12} marginTop={'24vh'} display={'flex'} justifyContent={'center'}>
          <Form onSubmit={onSubmit} hasPasswordInput={false} errors={resetPasswordError} />
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
