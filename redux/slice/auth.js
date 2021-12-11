import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  verifyToken: { loading: false, error: false, success: false },
  isAuthenticated: false,
  errorMessage: '',
  profile: null,
};

const config = {
  headers: {
    Authorization: null,
    'Content-Type': 'application/json',
  },
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/auth/register`,
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

/**
 * This action is dispatched whenever the app is loaded.
 * And it verifies whether the token is valid or not.
 * If it is, the user profile is returned and isAuthenticated is set to true;
 * Or else the token is cleared from the localStorage
 */
export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/user/current-user`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      Object.assign(state, initialState);
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.success = true;
        state.error = false;
        state.isAuthenticated = true;
        state.errorMessage = '';
        state.profile = payload;

        window.localStorage.setItem('token', payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.success = true;
        state.error = false;
        state.isAuthenticated = true;
        state.errorMessage = '';
        state.profile = payload;

        window.localStorage.setItem('token', payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.isAuthenticated = false;
        state.errorMessage = action.payload;
      })

      .addCase(verifyToken.pending, (state) => {
        state.verifyToken.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.verifyToken.loading = false;
        state.verifyToken.success = true;
        state.verifyToken.error = false;
        state.isAuthenticated = true;
        state.errorMessage = '';
        state.profile = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.verifyToken.loading = false;
        state.verifyToken.error = true;
        state.isAuthenticated = false;
        // state.errorMessage = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
