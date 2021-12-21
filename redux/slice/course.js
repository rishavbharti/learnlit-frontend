import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  errorMessage: null,
  create: { loading: false, error: false, success: false, errorMessage: null },
  courses: [],
};

export const getTaughtCourses = createAsyncThunk(
  'courses/getTaughtCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/me/taught-courses`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/course`, { ...data });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCreateState(state) {
      Object.assign(state.create, initialState.create);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaughtCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaughtCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = null;

        state.courses = action.payload;
      })
      .addCase(getTaughtCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })

      .addCase(createCourse.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.success = true;
        state.create.error = false;
        state.create.errorMessage = null;

        state.courses = [...state.courses, action.payload];
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = true;
        state.create.errorMessage = action.payload;
      });
  },
});

export const { resetCreateState } = coursesSlice.actions;

export default coursesSlice.reducer;
