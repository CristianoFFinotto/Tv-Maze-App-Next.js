import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { handleOnChangeTheme } from '../redux/themeSlice';
import Theme from '../components/Layout';
import Button from '@mui/material/Button';

export default function Home() {
  const dispatch = useDispatch();

  return (
    <Theme>
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
    </Theme>
  );
}
