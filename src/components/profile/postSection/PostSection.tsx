import React from 'react';
import s from './PostSection.module.css'
import { Post } from './posts/Post';
import { PostType } from '../../../data/posts';


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

