import { combineReducers, createStore } from 'redux';
import { profileReducer } from './profile-reducer';
import { dialogsReducer } from './dialogs-reducer';
import { messageContactsReducer } from './message-contacts-reducer';
import { usersReducer } from './users-reducer';
import { authReducer } from './auth-reducer';


export let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer
})

export type AppRootStateType  = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);


//@ts-ignore
let state = window.state;
