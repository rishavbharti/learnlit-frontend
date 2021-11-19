import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { wrapper } from 'redux/store';
import { verifyToken } from 'redux/slice/auth';

import { isBrowser } from 'src/utils';

import 'tailwindcss/tailwind.css';
import 'styles/globals.css';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#382D8B',
    },
    secondary: {
      main: '#8E24AA', // #FEA300
    },
  },
});

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = isBrowser() && window.localStorage.getItem('token');

    axios.defaults.headers.common = {
      Authorization: 'Bearer ' + token,
    };

    if (token && !isAuthenticated) {
      dispatch(verifyToken());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
