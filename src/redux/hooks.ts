import { RootState } from './store';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector