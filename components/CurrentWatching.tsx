import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../pages/_app';
import { RootState } from '../redux/store';

const CurrentWatching = () => {
  const watchingList = useSelector((state: RootState) => state.currentWatching.value);

  return auth?.currentUser?.uid && watchingList && watchingList[auth.currentUser.uid] ? (
    <div>
      <p>You are watching: {watchingList[auth.currentUser.uid].showName}</p>
    </div>
  ) : null;
};

export default CurrentWatching;
