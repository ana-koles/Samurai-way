import { AppDispatch } from "@/redux/redux-store"
import { chatApi, ChatMessageType } from "./chatApi"

type InitialStateType = typeof initialState

type ChatMessageReceivedACType = ReturnType<typeof chatMessageReceivedAC>
type ActionType = ChatMessageReceivedACType

const CHAT_MESSAGES_RECEIVED = 'CHAT-MESSAGES-RECEIVED'

const initialState = {
  messages: [] as ChatMessageType[]
}

export const chatReducer = (state: InitialStateType = initialState, action: ActionType) => {
  switch(action.type) {
    case CHAT_MESSAGES_RECEIVED:
      return {...state, messages: [...state.messages, ...action.payload.messages]}
  }
}

//actions
const chatMessageReceivedAC = (messages:ChatMessageType[]) => {
  return {type: CHAT_MESSAGES_RECEIVED, payload: {messages} as const}
}


//thunks

// subscribe and unsubscribe should receive the same function. In both cases this function should receive the same dispatch

type NewMessageHanderType = ((messages: ChatMessageType[]) => void) | null

let _newMessageHandler: NewMessageHanderType;
const newMessagesHandlerCreator = (dispatch: AppDispatch) => (messages: ChatMessageType[]) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) =>  dispatch(chatMessageReceivedAC(messages))
  }
  return _newMessageHandler
}

export const startMessageListeningTC = () => (dispatch: AppDispatch) => {
  //when this thunk is called, api should call callback fn inside subscribe
  // and pass messages that will be received throught ws,
  // when these messages will be received, they are dispatched in store
  chatApi.start()
  chatApi.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessageListingTC = () => (dispatch: AppDispatch) => {
  chatApi.unsubscribe(newMessagesHandlerCreator(dispatch))
  chatApi.stop()
}

export const sendMessageTC = (message: string) => async () => {
  chatApi.sendMessage(message)
}