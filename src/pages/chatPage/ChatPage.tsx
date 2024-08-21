import s from './ChatPage.module.css'
import avatar from '../../assets/friend2.jpg'

const ChatPage = () => {
  return (
    <div className={s.content}>
      <Chat/>
      <AddChatMessageForm/>
    </div>
  )
}

const Chat = () => {
  const messages = [1, 2, 3, 4]

  return (
    <div>{messages.map((message, index) => <Message key={index} />)}</div>
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
      <h4>{message.author}</h4>
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