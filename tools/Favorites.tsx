import React from 'react';
import { useEffect } from 'react';
import { auth, database } from '../pages/_app';
import { onValue, ref } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { handleOnChangeFavorites } from '../redux/favoritesSlice';

const Favorites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onValue(ref(database, `/`), (snapshot) => {
      if (snapshot.exists()) {
        dispatch(
          handleOnChangeFavorites(
            Object.values(snapshot.val().users[auth.currentUser!.uid].favorites),
          ),
        );
      } else {
        dispatch(handleOnChangeFavorites(null));
      }
    });
  }, []);

  return <></>;
};

export default Favorites;
