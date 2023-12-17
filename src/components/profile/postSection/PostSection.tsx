import React from 'react';
import s from './PostSection.module.css'
import { Post } from './posts/Post';
import { ActionType,PostType, UserType} from '../../../redux/store';

import { Button } from '../../button/Button';
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer';


type PostSectionPropsType = {
  posts: PostType[]
  currentText: string
  addPost: (name: string) => void
  updateNewPostText: (text: string) => void
}


export const PostSection: React.FC<PostSectionPropsType> = (props) => {

  //с помощью React.createRef
/*   переменная newPostText будет содержать ссылку на DOM-узел <textarea>, и вы можете
использовать эту ссылку в коде для взаимодействия с этим элементом, таким как получение
 его значения или изменение его свойств.
 */
  const newPostElement: React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  const onClickHandler = () => {
    /* props.addPost(); */ //здесь addPost вызывается не от объекта store, а от объекта props
    props.addPost('Fluffy Gangster')
  }

  const onChangeHandler = () => {
    if (newPostElement.current) {
      props.updateNewPostText(newPostElement.current.value)
    }
  }

  const postedMessages = props.posts.map(post => <Post key={post.id} {...post}/>)

  return (
    <div className={s.message_wrapper}>
      <div className={s.post_input}>
        <textarea
                ref={newPostElement}
                onChange={onChangeHandler}
                value={props.currentText}
                placeholder='Your text...'
        />
        <Button name='post' callback={onClickHandler}/>
      </div>
      {postedMessages}
    </div>
  );
};

