import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const DetailPage = () => {
  const router = useRouter();
  let id;

  try {
    let temp = Number(router.query.id);
    if (Number.isSafeInteger(temp)) {
      id = router.query.id;
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  } catch (err) {
    console.error(err);
  }

  if (!id)
    return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
        <strong>Only valid id params permitted</strong>
      </Box>
    );

  return <h1>{id}</h1>;
};

export default DetailPage;
