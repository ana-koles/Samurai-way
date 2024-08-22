import { ChatMessageType } from "./ChatPage";

type SubscriberType = (messages: ChatMessageType[]) => void

const subscribers = [] as SubscriberType[]

//there should not be any imports from react or redux, sinced
// api doesn't know anything about them
let ws: WebSocket;
const createChannel = () => {
  ws?.removeEventListener('close', onCloseChannelHandler)  //checking for reconnect: if channel was already opened, close it
  ws?.close()

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // create connection with this url
  ws.addEventListener('close', onCloseChannelHandler)
}

const onCloseChannelHandler = () => {
  console.log('Close ws')
  setTimeout(() => {
    createChannel() // reconnect in 3 seconds after the channel was closed (for example due to the internet issues)
  }, 3000)
}

const onMessageHandler = (e: MessageEvent) => {
  console.log(JSON.parse(e.data))
  const newMessages = JSON.parse(e.data)  //need to convert in JSON, because ws sends data in text and blob format

  //after receiving messages, need to pass them to all subscribers
  subscribers.forEach(sub => sub(newMessages))
}

export const chatApi = {
  // callback is a subscriber, so API could call it when new messages come and pass these messages
  subscribe(callback: SubscriberType) {
    //when subscribe will be called, this subscriber should be added to array of subscribers
    subscribers.push(callback)

    //1st option of unsubsribe: subscribe return a functions that later could be called to unsubscribe
    return () => subscribers.filter(sub => sub !== callback)
  },
  //2nd option of unsubscribe
  unsubscribe(callback: SubscriberType) {
    subscribers.filter(sub => sub !== callback)
  }
}