import React from 'react';
import Head from 'next/head';

type PropsType = {
  title: string;
  description: string;
};

const Header = (props: PropsType) => {
  return (
    <Head>
      <meta charSet='UTF-8' />
      <title>{props.title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='description' content={props.description} />
      <meta name='author' content='Cristiano Francesco Finotto' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default Header;
