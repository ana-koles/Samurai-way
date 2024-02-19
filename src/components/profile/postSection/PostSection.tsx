import React from 'react';
import s from './PostSection.module.css'
import { Post } from './posts/Post';
import { Button } from '../../button/Button';
import { PostSectionPropsType } from './PostSectionContainer';
import { PostFormDataType, PostReduxForm } from './postForm/PostForm';


/* type PostSectionPropsType = {
  posts: PostType[]
  currentText: string
  addPost: (name: string) => void
  updateNewPostText: (text: string) => void
} */


export const PostSection: React.FC<PostSectionPropsType> = React.memo((props) => {

  //с помощью React.createRef
/*   переменная newPostText будет содержать ссылку на DOM-узел <textarea>, и вы можете
использовать эту ссылку в коде для взаимодействия с этим элементом, таким как получение
 его значения или изменение его свойств.
 */
  //const newPostElement: React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  const onClickHandler = (values: PostFormDataType) => {//полученные значения из формы
    /* props.addPost(); */ //здесь addPost вызывается не от объекта store, а от объекта props
    let newPostMessage = values.newPostMessage;
    props.addPost('Fluffy Gangster', newPostMessage)
  }

/*   const onChangeHandler = () => {
    if (newPostElement.current) {
      props.updateNewPostText(newPostElement.current.value)
    }
  } */

  const postedMessages = props.posts.map(post => <Post key={post.id} {...post}/>)

  return (
    <div className={s.message_wrapper}>
      <PostReduxForm onSubmit={onClickHandler}/>
     {/*  <div className={s.post_input}>
        <textarea
                ref={newPostElement}
                onChange={onChangeHandler}
                value={props.currentText}
                placeholder='Your text...'
        />
        <Button name='post' callback={onClickHandler}/>
      </div> */}
      {postedMessages}
    </div>
  );
});

