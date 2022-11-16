import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { auth } from './_app';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';
import { Media, MediaApi } from '../Api/api';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

export default function Home() {
  const router = useRouter();
  const [medias, setMedias] = useState<Media[]>([]);

  const handleOnSearch = (search: string) => {
    if (search) {
      fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
        .then((res) => res.json())
        .then((data: MediaApi) => {
          const payload = data.map((item) => {
            return {
              id: item.show?.id || '',
              name: item.show?.name || '',
              genres: item.show?.genres || '',
              image: item.show?.image?.original || '',
              summary: item.show?.summary || '',
              rating: item.show?.rating?.average || '',
            };
          });
          setMedias(payload);
        })
        .catch((error: Error) => console.error(error.message));
    }
  };

  useEffect(() => {
    if (!auth.currentUser?.emailVerified) router.push('/signIn');
  }, []);

  if (!auth.currentUser?.emailVerified) return <Loading />;

  return (
    <>
      <Header title={'Tv Maze App'} description={'Tv Maze App'} />
      <MyAppBar handleOnSearch={handleOnSearch} />
      {medias.length > 0 ? (
        <Grid container spacing={2} marginTop={'64px'} padding={'10px 40px 20px 40px'}>
          {medias.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              display={'flex'}
              justifyContent={'center'}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia sx={{ textAlign: 'center' }}>
                    <Image
                      src={item.image || '/no-image-found.jpg'}
                      alt={item.name}
                      width={300}
                      height={300}
                      style={{ borderRadius: '10px' }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='medium' color='primary'>
                    Share
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : undefined}
    </>
  );
}
