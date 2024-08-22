import thunkMidleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { dialogsReducer } from '../features/dialog/model/dialogs-reducer';
import { usersReducer } from '../features/users/model/users-reducer';
import { authReducer } from '../features/auth/model/auth-reducer';
import {reducer as formReducer} from 'redux-form';
import { appReducer } from './app-reducer';
import { profileReducer } from '../features/profile/modal/profile-reducer';
import { chatReducer } from '@/pages/chatPage/chat-reducer';


export let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
  chat: chatReducer
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMidleware)));

//export const store = createStore(rootReducer, applyMiddleware(thunkMidleware));
export type AppRootStateType  = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;


type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
type InferActionType<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesType<T>>


//@ts-ignore
window.__store__ = store;
