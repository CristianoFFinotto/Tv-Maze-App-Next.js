import React from 'react';
import { Alert, Grid, Typography } from '@mui/material';
import { remove, ref } from 'firebase/database';
import { useSelector } from 'react-redux';
import { auth, database } from '../pages/_app';
import { RootState } from '../redux/store';
import MyButton from './MyButton';

const handleOnClickStop = () => {
  remove(ref(database, `watching/${auth.currentUser?.uid}`));
};

const CurrentWatching = () => {
  const watchingList = useSelector((state: RootState) => state.currentWatching.value);

  return auth?.currentUser?.uid && watchingList && watchingList[auth.currentUser.uid] ? (
    <Grid container marginTop={15} display={'flex'} justifyContent={'center'}>
      <Grid item xs={11} sm={6}>
        <Alert
          severity='info'
          action={
            <MyButton variant='outlined' handleOnClick={handleOnClickStop}>
              Stop
            </MyButton>
          }
        >
          <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            You are watching: {watchingList[auth.currentUser.uid].nameShow}
          </Typography>
        </Alert>
      </Grid>
    </Grid>
  ) : null;
};

export default CurrentWatching;
