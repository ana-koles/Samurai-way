import React, { ChangeEvent, useState } from 'react';
import s from './PostSection.module.css'
import { Post } from './posts/Post';
import { PostType } from '../../../redux/state';
import { Button } from '../../button/Button';


type PostSectionPropsType = {
  posts: PostType[]
  addPost: (postText: string) => void
}

export const PostSection: React.FC<PostSectionPropsType> = (props) => {

  const [postText, setPostText] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.currentTarget.value);
  }

  const onClickHandler = () => {
    props.addPost(postText);
    setPostText('');

  }

  const postedMessages = props.posts.map(post => <Post key={post.id} {...post}/>)

  return (
    <div className={s.message_wrapper}>
      <div className={s.post_input}>
        <textarea
                onChange={onChangeHandler}
                value={postText}
                placeholder='Your text...'>
        </textarea>
        <Button name='post' callback={onClickHandler}/>
      </div>


      {postedMessages}
    </div>
  );
};

