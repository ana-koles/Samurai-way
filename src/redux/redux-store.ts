import { combineReducers, createStore } from 'redux';
import { profileReducer } from './profile-reducer';
import { dialogsReducer } from './dialogs-reducer';
import { messageContactsReducer } from './message-contacts-reducer';


export let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  messageContacts: messageContactsReducer
})

export type AppRootStateType  = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);

