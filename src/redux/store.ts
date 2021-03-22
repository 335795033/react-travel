import { createStore } from 'redux'
import languageReducer from './language/languageReducer'


const store = createStore(languageReducer);

export type RootState = ReturnType<typeof store.getState> //取得state类型

export default store;