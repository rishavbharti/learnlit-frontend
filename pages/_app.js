import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { wrapper } from 'redux/store';
import { verifyToken } from 'redux/slice/auth';

import { isBrowser } from 'src/utils';

import 'styles/globals.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#382D8B',
    },
    secondary: {
      main: '#8E24AA', // #FEA300
    },
    body: '#FFFFFF',
    text: { main: '#000000' },
    bodyBg: { main: '#FFFFFF' },
  },
});

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    verifyToken: { loading },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = isBrowser() && window.localStorage.getItem('token');

    axios.defaults.headers.common = {
      Authorization: 'Bearer ' + token,
    };

    if (token && !isAuthenticated) {
      dispatch(verifyToken());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return (
      <div className='grid place-items-center h-screen'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Best online courses - Learn to succeed | learnlit</title>
        <meta
          name='description'
          content='learnlit is an online learning and teaching marketplace with varied courses. Learn programming, software development, marketing, data science and more.'
        />
        <meta
          name='title'
          content='Best online courses - Learn to succeed | learnlit'
        />
        <meta
          name='google-site-verification'
          content='U6O_I-6XFglFIh2T908LBYe2iWkSjbRmFsPtu6yOOWM'
        />
        {/* <meta
          name='google-site-verification'
          content='6MxDJP4nF8VZNKks8J06ql0Z3qA9rThOIq9s9MU851A'
        /> */}
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
