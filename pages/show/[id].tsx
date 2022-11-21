import { Grid, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Media, searchById } from '../../Api/api';
import Loading from '../../components/Loading';
import { RootState } from '../../redux/store';
import Image from 'next/image';

const DetailPage = () => {
  const [media, setMedia] = useState<Media>();
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
          {media ? (
            <Grid container>
              <Grid item xs={12} md={6} textAlign={'center'} marginTop={'2vh'}>
                <Image
                  src={media.image}
                  width={300}
                  height={300}
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
                  <Typography
                    variant='h6'
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
                    {Array.isArray(media.genres) ? (
                      <ul>
                        {media.genres.map((item, key) => (
                          <li key={key}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      media.genres
                    )}
                    <Typography variant='h6' fontWeight={'bold'}>
                      Summay
                    </Typography>
                    {media.summary}
                    <Typography variant='h6' fontWeight={'bold'}>
                      Rating
                    </Typography>
                    {media.rating}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
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
