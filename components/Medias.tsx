import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Media } from '../tools/Types';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopIcon from '@mui/icons-material/Stop';
import { auth } from '../pages/_app';

type PropsStype = {
  medias: Media[];
  // eslint-disable-next-line no-unused-vars
  handleOnCardClick: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleOnFavouriteClick: (id: string) => void;

  // eslint-disable-next-line no-unused-vars
  handleOnClickPlay: (id: string, name: string) => void;
  handleOnClickStop: () => void;
};

const Medias = (props: PropsStype) => {
  const favorites = useSelector((state: RootState) => state.currentFavorites.value);
  const watchingList = useSelector((state: RootState) => state.currentWatching.value);

  return (
    <Grid container spacing={2} marginTop={'64px'} padding={'10px 40px 20px 40px'}>
      {props.medias.map((item, index) => (
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
          <Card sx={{ maxWidth: 301 }}>
            <CardActionArea onClick={() => props.handleOnCardClick(item.id)}>
              <CardMedia sx={{ textAlign: 'center' }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  style={{ borderRadius: '10px' }}
                />
              </CardMedia>
              <CardContent
                sx={{
                  height: 60,
                }}
              >
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {item.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: 'felx', justifyContent: 'space-between' }}>
              {watchingList && watchingList[auth.currentUser!.uid]?.id === item.id ? (
                <IconButton aria-label='play tv/show' onClick={() => props.handleOnClickStop()}>
                  <StopIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label='play tv/show'
                  onClick={() =>
                    watchingList && watchingList[auth.currentUser!.uid]
                      ? undefined
                      : props.handleOnClickPlay(item.id, item.name)
                  }
                  disabled={watchingList && watchingList[auth.currentUser!.uid] ? true : false}
                >
                  <PlayCircleIcon />
                </IconButton>
              )}

              <IconButton
                aria-label='toggle password visibility'
                onClick={() => props.handleOnFavouriteClick(item.id)}
              >
                {favorites?.find((id) => id === item.id) ? (
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
  );
};

export default Medias;
