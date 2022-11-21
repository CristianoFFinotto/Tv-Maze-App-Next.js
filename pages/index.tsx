import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';
import { Media, searchByName } from '../Api/api';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { handleOnChangeCurrentSearch } from '../redux/currentSearchSlice';
import { ref, set, push, child, update } from 'firebase/database';
import { auth, database } from './_app';

export default function Home() {
  const [medias, setMedias] = useState<Media[]>([]);
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);
  const currentSearch = useSelector((state: RootState) => state.currentSearch.value);
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
    let key = push(ref(database, `users/${auth.currentUser?.uid}/favourites`), { id: id }).key;
    update();
  };

  return (
    <>
      {verifiedUser ? (
        <>
          <Header title={'Tv Maze App'} description={'Tv Maze App'} />
          <MyAppBar handleOnSearch={handleOnSearch} />
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
                          src={item.image}
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
                    <CardActions sx={{ display: 'felx', justifyContent: 'end' }}>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => handleOnFavouriteClick(item.id)}
                      >
                        {0 ? (
                          <FavoriteIcon sx={{ color: '#E0144C' }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: '#E0144C' }} />
                        )}
                      </IconButton>
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
