import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import { store } from '../redux/store';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

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

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
