import { Grid, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Form, { Inputs } from '../components/Form';
import Header from '../components/Header';
import { auth } from './_app';

const ResetPassword = () => {
  const [alertState, setAlertState] = useState(true);
  const [resetPasswordError, setResetPasswordError] = useState<string>('');
  const [verificationEmailSent, setVerificationEmailSent] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/signIn',
      handleCodeInApp: false,
    };

    sendPasswordResetEmail(auth, data.email, actionCodeSettings)
      .then((res) => setVerificationEmailSent(true))
      .catch((error: Error) =>
        setResetPasswordError(
          error.message === 'Firebase: Error (auth/user-not-found).'
            ? 'email not found!'
            : 'internal error!',
        ),
      );
  };
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
          <Form
            onSubmit={onSubmit}
            hasPasswordInput={false}
            alertState={alertState}
            setAlertState={setAlertState}
            errors={resetPasswordError}
            verificationEmailSent={verificationEmailSent}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
