import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { remove, ref } from 'firebase/database';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Media, searchById } from '../Api/api';
import Loading from '../components/Loading';
import Medias from '../components/Medias';
import MyAppBar from '../components/MyAppBar';
import { RootState } from '../redux/store';
import { auth, database } from './_app';

const Favorites = () => {
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);
  const favorites = useSelector((state: RootState) => state.favorites.value);
  const [medias, setMedias] = useState<Media[]>();
  const router = useRouter();

  const handleOnCardClick = (id: number) => {
    router.push(`/show/${id}`);
  };

  const handleOnFavouriteClick = (id: number) => {
    if (favorites?.find((value) => value === id)) {
      remove(ref(database, `users/${auth.currentUser?.uid}/favorites/${id}`));
    }
  };

  useEffect(() => {
    if (favorites) {
      Promise.allSettled(favorites.map((id) => searchById(`${id}`)))
        .then((result) => result.filter((element) => element.status === 'fulfilled'))
        .then((result: any) =>
          result.map((item: any) => ({
            id: item.value.id,
            name: item.value.name,
            image: item.value.image,
          })),
        )
        .then((data) => setMedias(data));
    }
  }, [favorites]);

  return (
    <>
      {verifiedUser ? (
        <>
          <MyAppBar />
          {medias && favorites ? (
            <Medias
              medias={medias}
              handleOnCardClick={handleOnCardClick}
              handleOnFavouriteClick={handleOnFavouriteClick}
            />
          ) : (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
              <Typography variant='h6'>Not favorites found!</Typography>
            </Box>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Favorites;
