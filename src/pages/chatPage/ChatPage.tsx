import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from './chatApi'
import s from './ChatPage.module.css'
import { useEffect, useRef, useState } from 'react'
import { sendMessageTC, startMessageListeningTC, stopMessageListingTC } from './chat-reducer'
import { selectChatStatus, selectMessages } from './chat-selectors'
import { AppDispatch } from '@/redux/redux-store'

const ChatPage = () => {
  console.log('Chat')
  return (
    <div className={s.content}>
      <Chat/>
    </div>
  )
}

const Chat = () => {
/*   const [wsChannel, setWsChannel] = useState<WebSocket | null>(null) */
  const dispatch: AppDispatch = useDispatch()
  const chatStatus = useSelector(selectChatStatus)

  useEffect(() => {
    dispatch(startMessageListeningTC())
    return () => dispatch(stopMessageListingTC())
  }, [dispatch])

/*   useEffect(() => { */
/*     let ws: WebSocket

    const onCloseChannelHandler = () => {
      console.log('Close ws')
      setTimeout(() => {
        createChannel()
      }, 3000)
    }

    const createChannel = () => {
      ws?.removeEventListener('close', onCloseChannelHandler)
      ws?.close()

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', onCloseChannelHandler)
      setWsChannel(ws)
    }

    createChannel() */
/*   }, []) */

/*   useEffect(() => {
    const onCloseHandler = () => {
      console.log('Close ws')
    }
    wsChannel?.addEventListener('close', onCloseHandler)

    return () =>  wsChannel?.removeEventListener('close', onCloseHandler)
  }, [wsChannel])
 */
  return (
    <>
      {chatStatus === 'error' ? <div>Some error occuried. Please refresh the page</div>
        :
        <>
          <Messages/>
          <AddChatMessageForm/>
        </>
      }
    </>
  )
}

const Messages = () => {
  const messages = useSelector(selectMessages)
  const messageScrollRef = useRef<HTMLDivElement>(null)

  //when new messages come, scroll have to put to div ref
  useEffect(() => {
    messageScrollRef.current?.scrollIntoView({behavior: 'smooth'})

  }, [messages])
/*   const [messages, setMessages] = useState<ChatMessageType[]>([]) */

/*   useEffect(() => { */
/*     const onMessageHandler = (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data)  */ //need to convert in JSON, because ws sends data in text and blob format
      /* setMessages(prevMessages => [...prevMessages, ...newMessages]) */ // receive messages through websocket -> set them in state
      // need to spread newMessages, because it is also an array
/*     } */

    //subscribe for message event of ws (synchronizing) when component mount
    // this event runs each time when server sends message through websocket
/*     wsChannel?.addEventListener('message', onMessageHandler)

    return () => wsChannel?.removeEventListener('message', onMessageHandler) */
/*   }, []) */

  return (
    <div style={{height: '400px', overflowY: 'auto'}}>
      {messages?.map((m, index) => <Message key={index} message={m}/>)}
      <div ref={messageScrollRef}></div>
    </div>
  )
}

type MessagePropsType = {
  message: ChatMessageType
}

const Message = ({message}: MessagePropsType) => {
  return (
    <div style={{marginBottom: '20px'}}>
      <img src={message.photo} alt={'avatar'} style={{height: '30px', width: '30px'}}/>
      <span>{message.userName}</span>
      <p>{message.message}</p>
    </div>
  )
}

const AddChatMessageForm = () => {
  const [message, setMessage] = useState('')
  const chatStatus = useSelector(selectChatStatus)
  const dispatch = useDispatch()

  useEffect(() => {
   /*  const onOpenHandler = () => { */ //subscribe for open event for ws
    /*    setChannelStatus('open')
    }

    wsChannel?.addEventListener('open', onOpenHandler)
    return () => wsChannel?.removeEventListener('open', onOpenHandler) */
  }, [])

  const onClickHandler = () => {
    if (!message) return
    dispatch(sendMessageTC(message))
    setMessage('')
  }

  const onChangeHanlder = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
  }

  return (
    <>
      <textarea onChange={e => onChangeHanlder(e)} value={message}/>
      <button disabled={chatStatus === 'pending'} onClick={onClickHandler}>send</button>
    </>
  )
}

export default ChatPage