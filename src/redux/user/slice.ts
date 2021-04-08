import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd'

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

export const signIn = createAsyncThunk( // 登录
  'user/signIn',
  async (paramaters: {
    email: string,
    password: string,
  }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`,{
      email: paramaters.email,
      password: paramaters.password
    })
    return data.token;
  }
)

export const userlSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut:(state)=>{
      state.token = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      message.success({ content: '登录成功', key:'login' });
      state.token = action.payload;
      state.loading = false;
      state.error = null
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})