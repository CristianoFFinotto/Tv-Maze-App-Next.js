import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Media, searchById } from '../Api/api';
import Loading from '../components/Loading';
import Medias from '../components/Medias';
import MyAppBar from '../components/MyAppBar';
import { RootState } from '../redux/store';
import { auth } from './_app';

const Favorites = () => {
  const verifiedUser = useSelector((state: RootState) => state.verifiedUser.value);
  const favorites = useSelector((state: RootState) => state.favorites.value);
  const [medias, setMedias] = useState<Media[]>([]);

  const handleOnCardClick = (id: number) => {
    console.log('card click');
  };

  const handleOnFavouriteClick = (id: number) => {
    console.log('favorite');
  };

  useEffect(() => {
    if (favorites) {
      let temp: Media[] = [];
      favorites.forEach((id) => {
        searchById(`${id}`)
          .then((media) => temp.push({ id: media.id, name: media.name, image: media.image }))
          .catch((err: Error) => {
            console.error(err.message);
          });
      });
      console.log(temp);

      setMedias(temp);
      console.log(temp);
      console.log(medias);
    }
  }, [favorites]);

  return (
    <>
      {verifiedUser ? (
        <>
          <MyAppBar />
          {medias.length > 0 ? (
            <Medias
              medias={medias}
              handleOnCardClick={handleOnCardClick}
              handleOnFavouriteClick={handleOnFavouriteClick}
            />
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Favorites;
