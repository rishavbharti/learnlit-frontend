import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  status: 'idle',
  profile: null,
  errorMessage: '',
  // isAuthenticated: Boolean(localStorage.getItem('accessToken')),
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(
    `${API}/registration-service`,
    {
      ...userData,
    },
    config
  );

  return response;
});

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/auth/login`,
        {
          ...userData,
        },
        config
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('accessToken');
      Object.assign(state, initialState);
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { payload } = action;
        state.status = 'idle';
        state.profile = payload;
        // window.localStorage.setItem('accessToken', payload.data);
        state.isAuthenticated = true;
        state.errorMessage = '';

        // window.location.replace('/');
      })
      .addCase(login.rejected, (state, action) => {
        const { payload } = action;
        state.status = 'failed';
        state.isAuthenticated = false;
        state.errorMessage = payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
