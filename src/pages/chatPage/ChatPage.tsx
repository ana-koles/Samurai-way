import s from './ChatPage.module.css'
import avatar from '../../assets/friend2.jpg'

const ChatPage = () => {
  return (
    <div className={s.content}>
      <Chat/>
    </div>
  )
}

const Chat = () => {
  return (
    <>
      <Messages/>
      <AddChatMessageForm/>
    </>
  )
}

const Messages = () => {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12, 13, 14, 15]

  return (
    <div style={{height: '400px', overflowY: 'auto'}}>
      {messages.map((message, index) => <Message key={index}/>)}
    </div>
  )
}

const Message = () => {
  const message = {
    avatar: avatar,
    author: 'Khalisy',
    text: 'Hi! I am Khalisy'
  }

  return (
    <div style={{marginBottom: '20px'}}>
      <img src={message.avatar} alt={'avatar'} style={{height: '30px', width: '30px'}}/>
      <span>{message.author}</span>
      <p>{message.text}</p>
    </div>
  )
}

const AddChatMessageForm = () => {
  return (
    <>
      <textarea/>
      <button>send</button>
    </>
  )
}

export default ChatPage