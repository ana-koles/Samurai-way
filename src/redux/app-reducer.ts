
import { getAuthUserDataTC } from "../features/auth/model/auth-reducer";
import { AppThunk } from "./redux-store";

const SET_INITIALIZED = 'SET_INITIALIZED';

const initialState = {
  isInitialized: false
}

type InitialStateType = typeof initialState;
type SetInitializedAT = ReturnType<typeof setInitialized>
type AppReducerActionType = SetInitializedAT;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {

  switch (action.type) {
    case SET_INITIALIZED:
      return {...state, isInitialized: true}

    default:
      return state
  }
}

//action
const setInitialized = () => ({type: SET_INITIALIZED} as const);

//thunk

export const setInitializeAppTC = (): AppThunk => async(dispatch) =>{
  await dispatch(getAuthUserDataTC());
  dispatch(setInitialized());
}