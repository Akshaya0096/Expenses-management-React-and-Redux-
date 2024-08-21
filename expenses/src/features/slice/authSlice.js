import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const sampleUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' ,password:"john"};


export const login = createAsyncThunk('auth/login', async (userData, { dispatch }) => {
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve({ data: sampleUser }), 1000)
  );
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return 'Logout successful';
});


export const signup = createAsyncThunk('auth/signup', async (userData, { dispatch }) => {
  
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve({ data: { ...sampleUser, email: userData.email,password:userData.password } }), 1000)
  );
  
  
  return response.data;
});


const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'succeeded';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
