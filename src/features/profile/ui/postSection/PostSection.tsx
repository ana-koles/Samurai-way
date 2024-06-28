import React from "react";
import s from "./PostSection.module.css";
import { Post } from "./posts/Post";
import { PostSectionPropsType } from "./PostSectionContainer";
import { PostFormDataType, PostReduxForm } from "./postForm/PostForm";

export const PostSection: React.FC<PostSectionPropsType> = React.memo(
  (props) => {

    const onClickHandler = (values: PostFormDataType) => {
      let newPostMessage = values.newPostMessage;
      props.addPost("Fluffy Gangster", newPostMessage);
    };

    const postedMessages = props.posts.map((post) => (
      <Post key={post.id} {...post} />
    ));

    return (
      <div className={s.message_wrapper}>
        <PostReduxForm onSubmit={onClickHandler} />

        {postedMessages}
      </div>
    );
  }
);
