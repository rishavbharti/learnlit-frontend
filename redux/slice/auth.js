import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  status: 'idle',
  errorMessage: '',
  // isAuthenticated: Boolean(localStorage.getItem('accessToken')),
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const signUp = createAsyncThunk('auth/signUp', async (userData) => {
  const response = await axios.post(
    `${API}/registration-service`,
    {
      ...userData,
    },
    config
  );

  return response;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  await axios
    .post(
      `${API}/auth/login`,
      {
        ...userData,
      },
      config
    )
    .then((response) => console.log('response ', response))
    .catch((err) => console.log(err.message));

  // return response;
});

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
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { payload } = action;
        state.status = 'idle';
        // window.localStorage.setItem('accessToken', payload.data);
        state.isAuthenticated = true;
        state.errorMessage = '';

        // window.location.replace("/#/dashboard/");
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = 'Error: Unable to login, details do not match';
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
