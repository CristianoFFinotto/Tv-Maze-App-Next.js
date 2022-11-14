import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Form from '../components/Form';
import { auth } from './_app';
import { Inputs } from '../components/Form';

const SignUp = () => {
  const [signUpError, setSignUpError] = useState<string>('');
  const [verificationEmailSent, setVerificationEmailSent] = useState<boolean>(false);
  const [alertState, setAlertState] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser?.emailVerified) {
      router.push('/');
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/sign-in',
      handleCodeInApp: false,
    };

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async () => {
        await sendEmailVerification(auth.currentUser!, actionCodeSettings)
          .then(() => {
            setVerificationEmailSent(true);
            setAlertState(true);
          })
          .catch((error) => console.error(error.message));
      })
      .catch((error) => {
        setSignUpError(error.message);
        setAlertState(true);
      });
  };

  return (
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
  );
};

export default SignUp;
