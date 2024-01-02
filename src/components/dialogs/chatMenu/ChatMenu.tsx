import React from 'react';
import s from './ChatMenu.module.css'
import { ChatMenuItem } from './chatMenuItem/ChatMenuItem';
import { ContactType } from '../../../redux/store';
import { AppRootStateType } from '../../../redux/redux-store';
import { connect } from 'react-redux';


type ChatMenyPropsType = {
  messageContacts: ContactType[]
}

export const ChatMenu: React.FC<ChatMenyPropsType>= (props) => {

  return (
    <div className={s.chat_wrapper}>
      <div className={s.chat_content_wrapper}>
        <h2>Let's Chat</h2>

        <ul>
          {props.messageContacts.map(contact => {
            return <ChatMenuItem name={contact.name} id={contact.id}/>
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