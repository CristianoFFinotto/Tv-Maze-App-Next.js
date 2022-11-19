import { Grid, Typography, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MyButton from '../components/MyButton';
import { RootState } from '../redux/store';
import { auth } from './_app';

const EmailVerification = () => {
  const authCurrentStatus = useSelector((state: RootState) => state.authCurrentStatus.value);

  if (authCurrentStatus) return <Loading />;

  return (
    <>
      <Header
        title={'Tv Maze App - Email Verification'}
        description={'Tv Maze App - Email Verification'}
      />
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
    </>
  );
};

export default EmailVerification;
