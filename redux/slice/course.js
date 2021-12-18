import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  errorMessage: null,
  courses: [],
};

export const fetchCourses = createAsyncThunk(
  'courses/get',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course-categories`);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = '';

        state.categories = payload.categories;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  },
});

export default coursesSlice.reducer;
