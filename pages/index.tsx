import React from 'react';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { ref, set, remove } from 'firebase/database';
import { auth, database } from './_app';
import Medias from '../components/Medias';

type MediaApi = [
  {
    show: {
      id: number;
      name: string;
      genres?: string[];
      rating?: {
        average?: number;
      };
      image?: {
        original?: string;
      };
      summary?: string;
    };
  },
];

type Media = {
  id: number;
  name: string;
  image: string;
};

export default function Home() {
  const [medias, setMedias] = useState<Media[]>([]);
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);
  const currentSearch = useSelector((state: RootState) => state.currentSearch.value);
  const favorites = useSelector((state: RootState) => state.favorites.value);

  const router = useRouter();

  useEffect(() => {
    if (currentSearch) {
      handleOnSearch(currentSearch);
    }
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
          {medias.length > 0 ? (
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
