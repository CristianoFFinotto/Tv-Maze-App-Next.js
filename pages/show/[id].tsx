import React from 'react';
import { Grid, List, ListItem, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MediaDetail, searchById } from '../../Api/api';
import Loading from '../../components/Loading';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import MyAppBar from '../../components/MyAppBar';

const DetailPage = () => {
  const [media, setMedia] = useState<MediaDetail>();
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);

  useEffect(() => {
    if (verifiedUser && !isNaN(Number(window.location.pathname.slice(6)))) {
      searchById(window.location.pathname.slice(6))
        .then((media) => setMedia(media))
        .catch((err: Error) => {
          console.error(err.message);
        });
    }
  }, [verifiedUser]);

  return (
    <>
      {verifiedUser ? (
        <>
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
                      {media.summary}
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
              <strong>Only valid id params permitted!</strong>
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
