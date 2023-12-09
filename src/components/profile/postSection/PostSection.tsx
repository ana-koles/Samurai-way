import React from 'react';
import s from './PostSection.module.css'
import { Post } from './posts/Post';
import { ActionType, PostType, addPostAC, updateNewPostTextAC } from '../../../redux/state';
import { Button } from '../../button/Button';


type PostSectionPropsType = {
  posts: PostType[]
  currentText: string
  /* addPost: () => void
  updateNewPostText: (text: string) => void */

  dispatch: (action: ActionType) => void
}


export const PostSection: React.FC<PostSectionPropsType> = (props) => {

  /* const [postText, setPostText] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.currentTarget.value);
  } */

  //с помощью React.createRef
/*   переменная newPostText будет содержать ссылку на DOM-узел <textarea>, и вы можете
использовать эту ссылку в коде для взаимодействия с этим элементом, таким как получение
 его значения или изменение его свойств.
 */
  const newPostElement: React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  const onClickHandler = () => {
    debugger;
    /* props.addPost(); */ //здесь addPost вызывается не от объекта store, а от объекта props
    /* props.dispatch({type: 'ADD-POST'}) */
    props.dispatch(addPostAC());
    console.log('click')
  }

  const onChangeHandler = () => {
    if (newPostElement.current) {
      /* props.updateNewPostText(newPostElement.current.value); */
      /* props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: newPostElement.current.value}) */
      props.dispatch(updateNewPostTextAC(newPostElement.current.value))
      console.log('change')
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

