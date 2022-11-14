import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { handleOnChangeTheme } from '../redux/themeSlice';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import router from 'next/router';
import { auth } from './_app';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.currentUser?.emailVerified) {
      router.push('/sign-in');
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Tv Maze App</title>
        <meta name='description' content='Tv Maze App' />
        <meta name='author' content='Cristiano Francesco Finotto' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Button variant='text' onClick={() => dispatch(handleOnChangeTheme())}>
          change theme
        </Button>
      </main>
    </div>
  );
}
