import { AppDispatch } from "@/redux/redux-store"
import { chatApi, ChatMessageAPIType, ChatMessageDisplayType, EventNames, MessageReceivedSubscriberType, StatusChangedSubscriberType, StatusType } from "./chatApi"
import {v1} from 'uuid'

type ChatStateType = typeof initialState
type ChatMessageReceivedAT = ReturnType<typeof chatMessageReceivedAC>
type ChatStatusChangedAT = ReturnType<typeof chatStatusChangedAC>
type ActionType = ChatMessageReceivedAT | ChatStatusChangedAT

const CHAT_MESSAGES_RECEIVED = 'CHAT-MESSAGES-RECEIVED'
const CHAT_STATUS_CHANGED = 'CHAT-STATUS-CHANGED'

const initialState = {
  messages: [] as ChatMessageDisplayType[],
  status: 'pending' as StatusType
}

export const chatReducer = (state: ChatStateType = initialState, action: ActionType): ChatStateType => {
  switch(action.type) {
    case CHAT_MESSAGES_RECEIVED:
      const displayMessages: ChatMessageDisplayType[] = [...action.payload.messages.map(m => ({...m, id: v1()})).slice(-20)]
      return {...state, messages: [...state.messages, ...displayMessages]}
    case CHAT_STATUS_CHANGED:
      return {...state, status: action.payload.status}
    default:
      return state
  }
}

//actions
const chatMessageReceivedAC = (messages:ChatMessageAPIType[]) => {
  return {type: CHAT_MESSAGES_RECEIVED, payload: {messages}} as const
}

const chatStatusChangedAC = (status: StatusType) => {
  return {type: CHAT_STATUS_CHANGED, payload: {status} } as const
}


//thunks

// subscribe and unsubscribe should receive the same function. In both cases this function should receive the same dispatch

type NewMessageHanderType = MessageReceivedSubscriberType | null

let _newMessageHandler: NewMessageHanderType = null;

const newMessagesHandlerCreator = (dispatch: AppDispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) =>  {
      dispatch(chatMessageReceivedAC(messages))
    }
  }
  return _newMessageHandler
}

type StatusChangedHandlerType = StatusChangedSubscriberType | null

let _statusChangedHandler: StatusChangedHandlerType = null;

const statusChangedHandlerCreator = (dispatch: AppDispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) =>  {
      dispatch(chatStatusChangedAC(status))
    }
  }
  return _statusChangedHandler
}

export const startMessageListeningTC = () => (dispatch: AppDispatch) => {
  //when this thunk is called, api should call callback fn inside subscribe
  // and pass messages that will be received throught ws,
  // when these messages will be received, they are dispatched in store

  chatApi.start()
  chatApi.subscribeToMessageReceive({eventName: EventNames.MESSAGE_RECEIVED, callback: newMessagesHandlerCreator(dispatch)})
  chatApi.subscribeToStatusChange({eventName: EventNames.STATUS_CHANGED, callback: statusChangedHandlerCreator(dispatch)})
}

export const stopMessageListingTC = () => (dispatch: AppDispatch) => {
  chatApi.unsubscribeFromMessageReceive({eventName: EventNames.MESSAGE_RECEIVED, callback: newMessagesHandlerCreator(dispatch)})
  chatApi.subscribeToStatusChange({eventName: EventNames.STATUS_CHANGED, callback: statusChangedHandlerCreator(dispatch)})
  chatApi.stop()
}

export const sendMessageTC = (message: string) => async () => {
  chatApi.sendMessage(message)
}