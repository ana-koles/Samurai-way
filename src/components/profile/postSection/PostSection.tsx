import React from 'react';
import s from './PostSection.module.css'
import { Post } from './posts/Post';

type PostType = {
    id: number
    name: string
    message: string
    likes: number
  }

type PostSectionPropsType = {
  posts: PostType[]
}

export const PostSection: React.FC<PostSectionPropsType> = (props) => {

  const postedMessages = props.posts.map(post => <Post key={post.id} {...post}/>)

  return (
    <div className={s.message_wrapper}>
      {postedMessages}
    </div>
  );
};

