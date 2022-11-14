import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { auth } from './_app';
import Form, { Inputs } from '../components/Form';
import MyButton from '../components/MyButton';

const SignIn = () => {
  const router = useRouter();
  const [alertState, setAlertState] = useState(true);
  const [SignInError, setSignInError] = useState<string>('');

  useEffect(() => {
    if (auth.currentUser?.emailVerified) {
      router.push('/');
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => (auth.currentUser?.emailVerified ? router.push('/') : undefined))
      .catch((error) => {
        setSignInError(error.message);
        setAlertState(true);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h3' gutterBottom textAlign={'center'} marginTop={'3vh'}>
          Sign in
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop={'24vh'} display={'flex'} justifyContent={'center'}>
        <Form
          onSubmit={onSubmit}
          errors={SignInError}
          alertState={alertState}
          setAlertState={setAlertState}
        />
      </Grid>
      <Grid item xs={12} marginTop={'2vh'} textAlign={'center'}>
        or
        <Link href={'/sign-up'}>
          <MyButton>Sign Up</MyButton>
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignIn;
