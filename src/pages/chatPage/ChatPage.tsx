import s from './ChatPage.module.css'

const ChatPage = () => {
  return (
    <div className={s.content}>
      <Chat/>
      <AddChatMessageForm/>
    </div>

  )
}

const Chat = () => {
  return (
    <div>Chat page</div>
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