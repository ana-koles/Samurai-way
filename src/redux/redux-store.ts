import thunkMidleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { profileReducer } from './profile-reducer';
import { dialogsReducer } from './dialogs-reducer';
import { usersReducer } from './users-reducer';
import { authReducer } from './auth-reducer';
import {reducer as formReducer} from 'redux-form';




export let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer //Обязательно название 'form', т.к. библиотека будет искать именно это название
                    //это стейт, с к-ым работает redux-form
})

export const store = createStore(rootReducer, applyMiddleware(thunkMidleware));
export type AppRootStateType  = ReturnType<typeof rootReducer>;



//@ts-ignore
window.store = store;
