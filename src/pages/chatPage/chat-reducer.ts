import { AppDispatch } from "@/redux/redux-store"
import { chatApi, ChatMessageType } from "./chatApi"

type InitialStateType = typeof initialState

type ChatMessageReceivedACType = ReturnType<typeof ChatMessageReceivedAC>
type ActionType = ChatMessageReceivedACType

const CHAT_MESSAGE_RECEIVED = 'CHAT-MESSAGE-RECEIVED'

const initialState = {
  messages: [] as ChatMessageType[]
}

export const chatReducer = (state: InitialStateType = initialState, action: ActionType) => {
  switch(action.type) {
    case CHAT_MESSAGE_RECEIVED:
      return {...state, messages: [...state.messages, ...action.payload.messages]}
  }
}

//actions
const ChatMessageReceivedAC = (messages:ChatMessageType[]) => {
  return {type: CHAT_MESSAGE_RECEIVED, payload: {messages} as const}
}

//thunks
const startMessageListeningTC = () => (dispatch: AppDispatch) => {
  //when this thunk is called, api should call callback inside subscribe
  // and pass messages that will be received throught ws
  // when these messages will be received, they are dispatched in store
  chatApi.subscribe((messages) => {
    dispatch(ChatMessageReceivedAC(messages))
  })
}