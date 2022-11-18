import { Grid, Typography, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import MyButton from '../components/MyButton';
import { auth } from './_app';

const emailVerification = () => {
  return (
    <Box height={'100vh'} textAlign={'center'} display={'flex'} alignItems={'center'}>
      <Grid container spacing={'2vh'}>
        <Grid item xs={12}>
          <Typography variant='h5' textAlign={'center'}>
            Confirm email verification, check into spam.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>or</Typography>
        </Grid>
        <Grid item xs={12}>
          <MyButton
            handleOnClick={() =>
              signOut(auth).catch((error: Error) => console.error(error.message))
            }
            variant='contained'
          >
            choose other account
          </MyButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default emailVerification;
