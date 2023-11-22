import React from 'react';
import s from './ChatMenu.module.css'
import { ChatMenuItem } from './chatMenuItem/ChatMenuItem';
import { ContactType } from '../../../data/dialogs';



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

         {/*  <li><NavLink to='/messages/6' className={`${s.chatItem} ${s.active}`}>Choupette</NavLink></li> */}
        </ul>

      </div>

    </div>
  );
};

