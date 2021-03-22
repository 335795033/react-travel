
export const CHANGE_LANGUAGE = 'change_language';
export const ADD_LANGUAGE = 'add_language';


interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE,
  payload: 'zh' | 'en'
}

interface AddLangugaAction {
  type: typeof ADD_LANGUAGE,
  payload: { name: string, code: string }
}

export type LanguageActionsTypes = ChangeLanguageAction | AddLangugaAction //混合类型 

export const chengeLangugaeActionCreator = (languageCode: 'zh' | 'en'): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode
  }
}

export const addLanguageActionCreator = (name: string, code: string): AddLangugaAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
}