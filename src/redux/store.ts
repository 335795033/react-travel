// import { createStore } from 'redux'
import languageReducer from './language/languageReducer'
import { productDetailSlice } from './productDetail/slice'
import { productSearchSlice } from './productSearch/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    language: languageReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer
})

// const store = createStore(rootReducer);
const store = configureStore({ // 切换成rtk的store
    reducer: rootReducer,
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState> //取得state类型

export default store;