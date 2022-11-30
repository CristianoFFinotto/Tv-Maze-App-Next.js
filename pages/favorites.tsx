import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { remove, ref } from 'firebase/database';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Medias from '../components/Medias';
import MyAppBar from '../components/MyAppBar';
import { RootState } from '../redux/store';
import { auth, database } from './_app';

type Media = {
  id: number;
  name: string;
  image: string;
};

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
      Promise.allSettled(favorites.map((id) => fetch(`https://api.tvmaze.com/shows/${id}`)))
        .then((resSettled) =>
          Promise.allSettled(
            resSettled.map((resFetch) =>
              resFetch.status === 'fulfilled' && resFetch.value.ok
                ? resFetch.value.json()
                : undefined,
            ),
          ),
        )
        .then((res) => {
          let medias: Media[] = [];

          res.forEach((res) => {
            if (res.status === 'fulfilled') {
              medias.push({
                id: res.value.id,
                name: res.value.name,
                image: res.value.image?.original || '/no-image-found.jpg',
              });
            }
          });
          setMedias(medias);
        });
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
