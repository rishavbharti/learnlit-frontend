import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import auth from './slice/auth';
import instructor from './slice/instructor';
import courses from './slice/course';
import courseCategories from './slice/courseCategories';
import dialog from './slice/dialog';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth,
      instructor,
      courses,
      courseCategories,
      dialog,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(makeStore, { debug: false });
