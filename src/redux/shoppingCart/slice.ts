import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface shoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[]
}

const initialState: shoppingCartState = {
  loading: false,
  error: null,
  items: []
}

export const getShoppingCart = createAsyncThunk(  // 请求购物车列表
  'shoppingCart/getShoppingCart',
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`
        }
      }
    )
    return data.shoppingCartItems
  }
)

export const addShoppingCartItem = createAsyncThunk(  // 添加购物车
  'shoppingCart/addShoppingCartItem',
  async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
    return data.shoppingCartItems
  }
)

export const checkout = createAsyncThunk(  // 结算购物车
  'shoppingCart/checkout',
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`
        }
      }
    )
    return data;
  }
)

export const clearShoppingCartItem = createAsyncThunk(  // 删除购物车
  'shoppingCart/clearShoppingCartItem',
  async (parameters: { jwt: string, itemIds: number[] }, thunkAPI) => {
    return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
  }
)

export const shoppingCartSlice = createSlice({
  name: 'shppingCart',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null
    },
    [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    //添加购物车
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    // 删除购物车
    [clearShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null
    },
    [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: (state) => {
      state.loading = true;
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  }
})