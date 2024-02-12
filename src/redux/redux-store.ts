import thunkMidleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>; //чтобы можно было в санке диспачить другие санки
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;



//@ts-ignore
window.store = store;
