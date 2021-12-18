import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  errorMessage: null,
  categories: [],
};

export const getCategories = createAsyncThunk(
  'courseCategories/getCategories',
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

export const courseCategoriesSlice = createSlice({
  name: 'courseCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = '';

        state.categories = payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  },
});

export default courseCategoriesSlice.reducer;
