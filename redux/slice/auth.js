import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  verifyToken: { loading: false, error: false, success: false },
  getCart: { loading: false, error: false, success: false },
  checkout: { loading: false, error: false, success: false },
  addRemoveCart: { loading: false, error: false, success: false },
  getWishlist: { loading: false, error: false, success: false },
  addRemoveWishlist: { loading: false, error: false, success: false },
  getEnrolledCourses: { loading: false, error: false, success: false },
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

export const getCart = createAsyncThunk(
  'auth/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/user/cart`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const addToCart = createAsyncThunk(
  'auth/addToCart',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/user/cart`, { id: _id });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'auth/removeFromCart',
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/user/cart/${_id}`);
      return _id;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const getWishlist = createAsyncThunk(
  'auth/getWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/user/wishlist`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'auth/addToWishlist',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/user/wishlist`, { id: _id });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'auth/removeFromWishlist',
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/user/wishlist/${_id}`);
      return _id;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const checkout = createAsyncThunk(
  'auth/checkout',
  async (ids, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/checkout`, { ids });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const getEnrolledCourses = createAsyncThunk(
  'auth/getEnrolledCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/user/enrolled-courses`);
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
    resetCheckout(state) {
      Object.assign(state.checkout, initialState.checkout);
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
      .addCase(verifyToken.rejected, (state) => {
        state.verifyToken.loading = false;
        state.verifyToken.error = true;
        state.isAuthenticated = false;
        // state.errorMessage = action.payload;
      })

      .addCase(getCart.pending, (state) => {
        state.getCart.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.getCart.loading = false;
        state.getCart.success = true;
        state.getCart.error = false;
        state.profile.cartCourses = action.payload;
      })
      .addCase(getCart.rejected, (state) => {
        state.getCart.loading = false;
        state.getCart.error = true;
      })

      .addCase(addToCart.pending, (state) => {
        state.addRemoveCart.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addRemoveCart.loading = false;
        state.addRemoveCart.success = true;
        state.addRemoveCart.error = false;
        state.profile.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.addRemoveCart.loading = false;
        state.addRemoveCart.error = true;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.addRemoveCart.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.addRemoveCart.loading = false;
        state.addRemoveCart.success = true;
        state.addRemoveCart.error = false;

        state.profile.cart = state.profile.cart.filter(
          (c) => c !== action.payload
        );

        state.profile.cartCourses = state.profile?.cartCourses?.filter(
          (c) => c._id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.addRemoveCart.loading = false;
        state.addRemoveCart.error = true;
      })

      .addCase(getWishlist.pending, (state) => {
        state.getWishlist.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.getWishlist.loading = false;
        state.getWishlist.success = true;
        state.getWishlist.error = false;
        state.profile.wishlistCourses = action.payload;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.getWishlist.loading = false;
        state.getWishlist.error = true;
      })

      .addCase(addToWishlist.pending, (state) => {
        state.addRemoveWishlist.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.addRemoveWishlist.loading = false;
        state.addRemoveWishlist.success = true;
        state.addRemoveWishlist.error = false;
        state.profile.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.addRemoveWishlist.loading = false;
        state.addRemoveWishlist.error = true;
      })

      .addCase(removeFromWishlist.pending, (state) => {
        state.addRemoveWishlist.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.addRemoveWishlist.loading = false;
        state.addRemoveWishlist.success = true;
        state.addRemoveWishlist.error = false;

        state.profile.wishlist = state.profile.wishlist.filter(
          (c) => c !== action.payload
        );

        state.profile.wishlistCourses = state.profile?.wishlistCourses?.filter(
          (c) => c._id !== action.payload
        );
      })
      .addCase(removeFromWishlist.rejected, (state) => {
        state.addRemoveWishlist.loading = false;
        state.addRemoveWishlist.error = true;
      })

      .addCase(checkout.pending, (state) => {
        state.checkout.loading = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        const { cart, wishlist, enrolledCourses } = action.payload;
        state.checkout.loading = false;
        state.checkout.success = true;
        state.checkout.error = false;

        state.profile.wishlist = wishlist;
        state.profile.cart = cart;
        state.profile.cartCourses = [];
        state.profile.enrolledCourses = enrolledCourses;
      })
      .addCase(checkout.rejected, (state) => {
        state.checkout.loading = false;
        state.checkout.error = true;
      })

      .addCase(getEnrolledCourses.pending, (state) => {
        state.getEnrolledCourses.loading = true;
      })
      .addCase(getEnrolledCourses.fulfilled, (state, action) => {
        state.getEnrolledCourses.loading = false;
        state.getEnrolledCourses.success = true;
        state.getEnrolledCourses.error = false;

        state.profile.enrolledCoursesData = action.payload;
      })
      .addCase(getEnrolledCourses.rejected, (state) => {
        state.getEnrolledCourses.loading = false;
        state.getEnrolledCourses.error = true;
      });
  },
});

export const { logout, resetCheckout } = authSlice.actions;

export default authSlice.reducer;
