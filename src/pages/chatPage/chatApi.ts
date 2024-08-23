
export type MessageReceivedSubscriberType = (messages: ChatMessageType[]) => void
export type StatusChangedSubscriberType = (status: StatusType) => void

export enum EventNames {
  MESSAGE_RECEIVED = 'messages-received',
  STATUS_CHANGED = 'status=changed'
}

let subscribers = {
  [EventNames.MESSAGE_RECEIVED]: [] as MessageReceivedSubscriberType[],
  [EventNames.STATUS_CHANGED]: [] as StatusChangedSubscriberType[]
}

const statusChangeSubscribersNotify = (status: StatusType) => {
  subscribers[EventNames.STATUS_CHANGED].forEach(sub => sub(status))
}

//there should not be any imports from react or redux, sinced
// api doesn't know anything about them
let ws: WebSocket | null = null;

const cleanUp = () => {
  ws?.removeEventListener('message', onMessageHandler)
  ws?.removeEventListener('close', onCloseChannelHandler)
  ws?.removeEventListener('open', onOpenHandler)
  ws?.removeEventListener('error', onErrorHandler)
}

const createChannel = () => {
  cleanUp() //checking for reconnect: if channel was already opened, close it
  ws?.close()
  statusChangeSubscribersNotify('pending')
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // create connection with this url
  ws.addEventListener('close', onCloseChannelHandler)
  ws.addEventListener('message', onMessageHandler)
  ws.addEventListener('open', onOpenHandler)
  ws.addEventListener('error', onErrorHandler)
}

const onCloseChannelHandler = () => {
  setTimeout(() => {
    createChannel() // reconnect in 3 seconds after the channel was closed (for example due to the internet issues)
  }, 3000)
}

const onOpenHandler = () => {
  statusChangeSubscribersNotify('ready')
}

const onErrorHandler = () => {
  statusChangeSubscribersNotify('error')
  console.log('REFRESH THE PAGE')
}

const onMessageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)  //need to convert in JSON, because ws sends data in text and blob format

  //after receiving messages, need to pass them to all subscribers
  subscribers['messages-received'].forEach(sub => sub(newMessages))
}

export const chatApi = {
  start() {
    createChannel()
  },
  stop(){
    subscribers['messages-received'] = []
    subscribers['status=changed'] = []
    cleanUp()
    ws?.close()
  },
  // callback is a subscriber, so API could call it when new messages come and pass these messages

  subscribeToMessageReceive(params: MessagesReceiveFnType) {
    //when subscribe fn will be called, this subscriber (callback) should be added to array of subscribers

    subscribers[params.eventName].push(params.callback)

    //1st option of unsubsribe: subscribe return a functions that later could be called to unsubscribe
    return () => subscribers[params.eventName].filter(sub => sub !== params.callback)
  },

  //2nd option of unsubscribe
  unsubscribeFromMessageReceive(params: MessagesReceiveFnType) {
    subscribers[params.eventName].filter(sub => sub !== params.callback)
  },

  subscribeToStatusChange(params: StatusChangeFnType) {
    subscribers[params.eventName].push(params.callback)
    return () => subscribers[params.eventName].filter(sub => sub !== params.callback)
  },
  //2nd option of unsubscribe
  unsubscribeFromStatusChange(params: StatusChangeFnType) {
    subscribers[params.eventName].filter(sub => sub !== params.callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceiveFnType = {
  eventName: EventNames.MESSAGE_RECEIVED,
  callback: MessageReceivedSubscriberType
}

type StatusChangeFnType = {
  eventName: EventNames.STATUS_CHANGED,
  callback: StatusChangedSubscriberType
}

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}
