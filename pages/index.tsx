import React from 'react';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { ref, set, remove } from 'firebase/database';
import { auth, database } from './_app';
import Medias from '../components/Medias';
import { Media, MediaApi } from '../tools/Types';

export default function Home() {
  const [medias, setMedias] = useState<Media[]>([]);
  const verifiedUser = useSelector((state: RootState) => state.currentUserVerified.value);
  const currentSearch = useSelector((state: RootState) => state.currentSearch.value);
  const favorites = useSelector((state: RootState) => state.currentFavorites.value);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (currentSearch) {
      handleOnSearch(currentSearch);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSearch = async (search: string) => {
    if (search) {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
      if (res.ok) {
        const data: MediaApi = await res.json();
        setMedias(
          data.map((item) => ({
            id: item.show.id,
            name: item.show.name,
            image: item.show.image?.original || '/no-image-found.jpg',
          })),
        );
      }
    }
  };

  const handleOnCardClick = (id: string) => {
    router.push(`/show/${id}`);
  };

  const handleOnFavouriteClick = (id: string) => {
    if (favorites?.find((value) => value === id)) {
      remove(ref(database, `users/${auth.currentUser?.uid}/favorites/${id}`));
    } else {
      set(ref(database, `users/${auth.currentUser?.uid}/favorites/${id}`), id);
    }
  };

  const handleOnClickPlay = (id: string, nameShow: string) => {
    set(ref(database, `watching/${auth.currentUser?.uid}`), { id, nameShow });
  };

  const handleOnClickStop = () => {
    remove(ref(database, `watching/${auth.currentUser?.uid}`));
  };

  return (
    <>
      {verifiedUser ? (
        <>
          <Header title={'Tv Maze App'} description={'Tv Maze App'} />
          <MyAppBar handleOnSearch={handleOnSearch} />
          {medias.length > 0 ? (
            <Medias
              medias={medias}
              handleOnCardClick={handleOnCardClick}
              handleOnFavouriteClick={handleOnFavouriteClick}
              handleOnClickPlay={handleOnClickPlay}
              handleOnClickStop={handleOnClickStop}
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
