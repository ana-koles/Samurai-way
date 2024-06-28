import React from 'react';
import s from './ChatMenu.module.css'
import { ChatMenuItem } from './chatMenuItem/ChatMenuItem';
import { AppRootStateType } from '../../../../../redux/redux-store';
import { connect } from 'react-redux';


type ContactType = {
  id: number
  name: string
}

type ChatMenuPropsType = {
  messageContacts: ContactType[]
}

export const ChatMenu = ({messageContacts}: ChatMenuPropsType) => {

  return (
    <div className={s.chat_wrapper}>
      <div className={s.chat_content_wrapper}>
        <h2>Let's Chat</h2>
        <ul>
          {messageContacts.map(contact => {
            return <ChatMenuItem key={contact.id} name={contact.name} id={contact.id}/>
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppRootStateType) => {
  return {
    messageContacts: state.dialogsPage.messageContacts,
  };
};

export default connect(mapStateToProps)(ChatMenu);