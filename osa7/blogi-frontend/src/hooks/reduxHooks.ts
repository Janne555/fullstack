import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { ThunkDispatch } from "redux-thunk"
import { Action } from '../types'

export function useAppSelector<TSelected>(selector: (state: AppState) => TSelected): TSelected {
  const result = useSelector<AppState, TSelected>(selector)
  return result
}

export function useAppDispatch(): ThunkDispatch<AppState, undefined, Action.AppAction> {
  const dispatch = useDispatch<ThunkDispatch<AppState, undefined, Action.AppAction>>()
  return dispatch
}