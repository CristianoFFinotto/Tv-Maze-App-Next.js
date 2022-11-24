import React from 'react';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';
import { Media, searchByName } from '../Api/api';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { handleOnChangeCurrentSearch } from '../redux/currentSearchSlice';
import { ref, set, remove } from 'firebase/database';
import { auth, database } from './_app';
import Medias from '../components/Medias';

export default function Home() {
  const [medias, setMedias] = useState<Media[]>([]);
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);
  const currentSearch = useSelector((state: RootState) => state.currentSearch.value);
  const favorites = useSelector((state: RootState) => state.favorites.value);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    handleOnSearch(currentSearch);
  }, []);

  const handleOnSearch = (search: string) => {
    dispatch(handleOnChangeCurrentSearch(search));

    if (search) {
      searchByName(search)
        .then((data) => {
          setMedias(data);
        })
        .catch((err: Error) => console.error(err.message));
    }
  };

  const handleOnCardClick = (id: number) => {
    router.push(`/show/${id}`);
  };

  const handleOnFavouriteClick = (id: number) => {
    if (favorites?.find((value) => value === id)) {
      remove(ref(database, `users/${auth.currentUser?.uid}/favorites/${id}`));
    } else {
      set(ref(database, `users/${auth.currentUser?.uid}/favorites/${id}`), id);
    }
  };

  return (
    <>
      {verifiedUser ? (
        <>
          <Header title={'Tv Maze App'} description={'Tv Maze App'} />
          <MyAppBar handleOnSearch={handleOnSearch} />
          {medias.length > 0 && currentSearch ? (
            <Medias
              medias={medias}
              handleOnCardClick={handleOnCardClick}
              handleOnFavouriteClick={handleOnFavouriteClick}
            />
          ) : (
            <Box height={'100vh'} textAlign={'center'} display={'flex'} alignItems={'center'}>
              <Grid container spacing={'2vh'}>
                <Grid item xs={12}>
                  <Typography variant='h5' textAlign={'center'}>
                    Search a film or tv show
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
