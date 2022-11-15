import Head from 'next/head';

type PropsType = {
  title: string;
  description: string;
};

const Header = (props: PropsType) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name='description' content={props.description} />
      <meta name='author' content='Cristiano Francesco Finotto' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default Header;
