import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MyButton from '../components/MyButton';
import { RootState } from '../redux/store';
import { auth } from './_app';

const EmailVerification = () => {
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);

  return (
    <>
      {!verifiedUser ? (
        <>
          <Header
            title={'Tv Maze App - Email Verification'}
            description={'Tv Maze App - Email Verification'}
          />
          <Box height={'100vh'} textAlign={'center'} display={'flex'} alignItems={'center'}>
            <Grid container spacing={'2vh'}>
              <Grid item xs={12}>
                <Typography variant='h5' textAlign={'center'}>
                  Link email verification is sento to your email.
                  <br />
                  <strong>If you not find it, check into spam.</strong>
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EmailVerification;
