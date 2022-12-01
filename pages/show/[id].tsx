import React from 'react';
import { Grid, List, ListItem, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import Loading from '../../components/Loading';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import MyAppBar from '../../components/MyAppBar';
import { MediaDetail, MediaDetailApi } from '../../tools/Types';
import Header from '../../components/Header';

type PropsType = {
  data: MediaDetail | null;
};

export async function getServerSideProps({ resolvedUrl }: any) {
  let data: MediaDetail;
  let id = Number(resolvedUrl.slice(6));

  if (!isNaN(id)) {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (res.ok) {
      const result: MediaDetailApi = await res.json();

      data = {
        id: result.id,
        name: result.name,
        genres: result.genres.length > 0 ? result.genres : ['no genres available'],
        image: result.image?.original || '/no-image-found.jpg',
        summary: result.summary ? result.summary : 'no summary available',
        rating: result.rating?.average || 'no rating available',
      };
      return { props: { data: data } };
    }
  }
  return { props: { data: null } };
}

const DetailPage = (props: PropsType) => {
  const [media, setMedia] = useState<MediaDetail>();
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);

  useEffect(() => {
    if (verifiedUser) {
      if (props.data) {
        setMedia(props.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifiedUser]);

  return (
    <>
      {verifiedUser ? (
        <>
          <Header title={'Tv Maze App - Detail'} description={'Tv Maze App - Detail'} />
          <MyAppBar />
          {media ? (
            <Box display={{ md: 'flex' }} alignItems={{ md: 'center' }} marginTop={'10vh'}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  marginTop={'2vh'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Image
                    src={media.image}
                    width={350}
                    height={350}
                    priority={true}
                    alt={media.name}
                    style={{ borderRadius: '10px' }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  display={'flex'}
                  justifyContent={'center'}
                  marginTop={'2vh'}
                >
                  <Paper elevation={10} sx={{ margin: '0 3% 3% 3%', padding: '3%' }}>
                    <Box
                      textAlign={'justify'}
                      width={{ sm: '50%' }}
                      padding={{ xs: '5%', sm: '0' }}
                    >
                      <Typography variant='h6' fontWeight={'bold'}>
                        Name
                      </Typography>
                      {media.name}
                      <Typography variant='h6' fontWeight={'bold'}>
                        Genres
                      </Typography>

                      <List>
                        {media.genres.map((item, key) => (
                          <ListItem key={key}>{item}</ListItem>
                        ))}
                      </List>
                      <Typography variant='h6' fontWeight={'bold'}>
                        Summay
                      </Typography>
                      {parse(media.summary)}
                      <Typography variant='h6' fontWeight={'bold'}>
                        Rating
                      </Typography>
                      {media.rating}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
              <Typography variant='h6'>Only valid id params permitted!</Typography>
            </Box>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DetailPage;
