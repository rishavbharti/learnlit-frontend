import React from 'react';
import Head from 'next/head';

const Meta = (props) => {
  const { title, subtitle } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={subtitle} />
      <meta name='title' content={title} />
    </Head>
  );
};

export default Meta;
