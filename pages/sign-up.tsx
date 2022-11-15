import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Form from '../components/Form';
import { auth } from './_app';
import { Inputs } from '../components/Form';
import Loading from '../components/Loading';
import Header from '../components/Header';

const SignUp = () => {
  const [signUpError, setSignUpError] = useState<string>('');
  const [verificationEmailSent, setVerificationEmailSent] = useState<boolean>(false);
  const [alertState, setAlertState] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser?.emailVerified) router.push('/');
  }, []);

  if (auth.currentUser?.emailVerified) return <Loading />;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/sign-in',
      handleCodeInApp: false,
    };

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (res) => {
        await sendEmailVerification(res.user, actionCodeSettings)
          .then(() => {
            setVerificationEmailSent(true);
            setAlertState(true);
          })
          .catch(() => {
            setSignUpError('error during sending email verification!');
            setAlertState(true);
          });
      })
      .catch((error: Error) => {
        setSignUpError(
          error.message === 'Firebase: Error (auth/email-already-in-use).'
            ? 'email already exists'
            : 'internal error!',
        );
        setAlertState(true);
      });
  };

  return (
    <>
      <Header title={'Tv Maze App - Sign up'} description={'Tv Maze App - Sign up'} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3' gutterBottom textAlign={'center'} marginTop={'3vh'}>
            Sign up
          </Typography>
        </Grid>
        <Grid item xs={12} marginTop={'24vh'} display={'flex'} justifyContent={'center'}>
          <Form
            onSubmit={onSubmit}
            alertState={alertState}
            setAlertState={setAlertState}
            errors={signUpError}
            verificationEmailSent={verificationEmailSent}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
