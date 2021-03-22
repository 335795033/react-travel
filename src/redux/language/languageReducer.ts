import i18n from 'i18next';
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionsTypes } from './languageActions'


export interface LanguageState {
  language: 'en' | 'zh',
  languageList: { name: string, code: string }[]; //语言的切换选项
}

const defaultState: LanguageState = { //初始化数据
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' }
  ],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action: LanguageActionsTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload) //这样处理是不标注的。有副作用的
      return { ...state, language: action.payload } //展开原来的state，然后更新state中的language为action.payload
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload]
      }
    default:
      return state
  }
};