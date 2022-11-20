import { useState } from 'react';
import Image from 'next/image';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';
import { Media, searchByName } from '../Api/api';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';

export default function Home() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);
  const router = useRouter();

  const handleOnSearch = (search: string) => {
    if (search) {
      searchByName(search)
        .then((data) => setMedias(data))
        .catch((err: Error) => console.error(err.message));
    }
  };

  const handleOnCardClick = (id: number) => {
    router.push(`/show/${id}`);
  };

  return (
    <>
      {verifiedUser ? (
        <>
          <Header title={'Tv Maze App'} description={'Tv Maze App'} />
          <MyAppBar handleOnSearch={handleOnSearch} setCurrentSearch={setCurrentSearch} />
          {medias.length > 0 && currentSearch ? (
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
                    <CardActionArea onClick={() => handleOnCardClick(item.id)}>
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
