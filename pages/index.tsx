import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleOnChangeTheme } from '../redux/themeSlice';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { auth } from './_app';
import Loading from '../components/Loading';
import Header from '../components/Header';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser?.emailVerified) router.push('/sign-in');
  }, []);

  if (!auth.currentUser?.emailVerified) return <Loading />;

  return (
    <>
      <Header title={'Tv Maze App'} description={'Tv Maze App'} />

      <main>
        <Button variant='text' onClick={() => dispatch(handleOnChangeTheme())}>
          change theme
        </Button>
      </main>
    </>
  );
}
