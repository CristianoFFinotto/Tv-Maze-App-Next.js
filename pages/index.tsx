import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleOnChangeTheme } from '../redux/themeSlice';
import { useRouter } from 'next/router';
import { auth } from './_app';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyButton from '../components/MyButton';
import { signOut } from 'firebase/auth';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser?.emailVerified) router.push('/signIn');
  }, []);

  if (!auth.currentUser?.emailVerified) return <Loading />;

  return (
    <>
      <Header title={'Tv Maze App'} description={'Tv Maze App'} />

      <main>
        <MyButton variant={'text'} handleOnClick={() => dispatch(handleOnChangeTheme())}>
          change theme
        </MyButton>
        <MyButton
          variant={'contained'}
          handleOnClick={() =>
            signOut(auth)
              .then(() => router.push('/signIn'))
              .catch((error: Error) => console.error(error.message))
          }
        >
          sign out
        </MyButton>
      </main>
    </>
  );
}
