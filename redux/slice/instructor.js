import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import router from 'next/router';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  errorMessage: null,
  instructors: [],
  profile: null,
};

export const becomeInstructor = createAsyncThunk(
  'instructor/becomeInstructor',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/become-instructor`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const getInstructorProfile = createAsyncThunk(
  'instructor/getInstructorProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/instructor/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const getAddedInstructors = createAsyncThunk(
  'instructor/getAddedInstructors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/added-instructors`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const addInstructor = createAsyncThunk(
  'instructor/addInstructor',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/instructor/add`, { ...data });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(becomeInstructor.pending, (state) => {
        state.loading = true;
      })
      .addCase(becomeInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = '';

        state.profile = action.payload;

        router.push('/instructor/courses');
      })
      .addCase(becomeInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })

      .addCase(getInstructorProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = '';

        state.profile = action.payload;
      })
      .addCase(getInstructorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })

      .addCase(addInstructor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = '';

        state.profile = action.payload;
      })
      .addCase(addInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })

      .addCase(getAddedInstructors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddedInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = '';

        state.instructors = action.payload;
      })
      .addCase(getAddedInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  },
});

export default instructorSlice.reducer;
