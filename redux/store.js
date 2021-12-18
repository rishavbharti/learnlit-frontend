import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import auth from './slice/auth';
import dialog from './slice/dialog';
import courseCategories from './slice/courseCategories';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth,
      dialog,
      courseCategories,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(makeStore, { debug: false });
