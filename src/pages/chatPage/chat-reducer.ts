import { AppDispatch } from "@/redux/redux-store"
import { chatApi, ChatMessageType, EventNames, StatusType } from "./chatApi"

type ChatStateType = typeof initialState


type ChatMessageReceivedAT = ReturnType<typeof chatMessageReceivedAC>
type ChatStatusChangedAT = ReturnType<typeof chatStatusChangedAC>
type ActionType = ChatMessageReceivedAT | ChatStatusChangedAT

const CHAT_MESSAGES_RECEIVED = 'CHAT-MESSAGES-RECEIVED'
const CHAT_STATUS_CHANGED = 'CHAT-STATUS-CHANGED'

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
}

export const chatReducer = (state: ChatStateType = initialState, action: ActionType): ChatStateType => {
  switch(action.type) {
    case CHAT_MESSAGES_RECEIVED:
      return {...state, messages: [...state.messages, ...action.payload.messages]}
    case CHAT_STATUS_CHANGED:
      return {...state, status: action.payload.status}
    default:
      return state
  }
}

//actions
const chatMessageReceivedAC = (messages:ChatMessageType[]) => {
  return {type: CHAT_MESSAGES_RECEIVED, payload: {messages}} as const
}

const chatStatusChangedAC = (status: StatusType) => {
  return {type: CHAT_STATUS_CHANGED, payload: {status} } as const
}


//thunks

// subscribe and unsubscribe should receive the same function. In both cases this function should receive the same dispatch

type NewMessageHanderType = ((messages: ChatMessageType[]) => void) | null

let _newMessageHandler: NewMessageHanderType = null;

const newMessagesHandlerCreator = (dispatch: AppDispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) =>  {
      dispatch(chatMessageReceivedAC(messages))
    }
  }
  return _newMessageHandler
}

export const startMessageListeningTC = () => (dispatch: AppDispatch) => {
  //when this thunk is called, api should call callback fn inside subscribe
  // and pass messages that will be received throught ws,
  // when these messages will be received, they are dispatched in store

  chatApi.start()
  chatApi.subscribe(EventNames.MESSAGE_RECEIVED, newMessagesHandlerCreator(dispatch))
}

export const stopMessageListingTC = () => (dispatch: AppDispatch) => {
  chatApi.unsubscribe(EventNames.MESSAGE_RECEIVED, newMessagesHandlerCreator(dispatch))
  chatApi.stop()
}

export const sendMessageTC = (message: string) => async () => {
  chatApi.sendMessage(message)
}