// import { createStore } from 'redux'
import languageReducer from './language/languageReducer'
import { productDetailSlice } from './productDetail/slice'
import { productSearchSlice } from './productSearch/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userlSlice } from './user/slice'
import { persistStore, persistReducer } from 'redux-persist' // 登录持久化
import storage from 'redux-persist/lib/storage'
import { shoppingCartSlice } from './shoppingCart/slice'
import { orderSlice } from './order/slice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'] // 把rootReducer中的user保存起来
}

const rootReducer = combineReducers({
    language: languageReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userlSlice.reducer,
    shoppingCart:shoppingCartSlice.reducer,
    order:orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer);
const store = configureStore({ // 切换成rtk的store
    reducer: persistedReducer,
    devTools: true,
})

const persistor = persistStore(store) //持久化的store

export type RootState = ReturnType<typeof store.getState> //取得state类型

export default { store, persistor };