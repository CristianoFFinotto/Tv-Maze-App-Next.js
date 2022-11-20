import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Media, searchById } from '../../Api/api';
import Loading from '../../components/Loading';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import { auth } from '../_app';

const DetailPage = () => {
  const [media, setMedia] = useState<Media>();
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);

  useEffect(() => {
    console.log(verifiedUser);

    console.log(isNaN(Number(window.location.pathname.slice(6))));

    if (verifiedUser && !isNaN(Number(window.location.pathname.slice(6)))) {
      searchById(window.location.pathname.slice(6))
        .then((media) => setMedia(media))
        .catch((err: Error) => {
          console.error(err.message);
        });
    }
  }, []);

  return (
    <>
      {verifiedUser ? (
        <>
          {media ? (
            <Box width={'50vh'}>
              <Grid container>
                <Grid item xs={12}>
                  <Image
                    src={media.image || '/no-image-found.jpg'}
                    width={300}
                    height={300}
                    alt={media.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5'>{media.summary}</Typography>
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
