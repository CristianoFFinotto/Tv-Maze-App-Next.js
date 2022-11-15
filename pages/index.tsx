import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from './_app';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';

export default function Home() {
  const router = useRouter();

  const handleOnSearch = (search: string) => {
    if (search) {
      fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
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
    </>
  );
}
