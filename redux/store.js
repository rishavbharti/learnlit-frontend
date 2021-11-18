import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import auth from './slice/auth';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(makeStore, { debug: false });
