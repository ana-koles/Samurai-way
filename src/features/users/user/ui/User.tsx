import React from "react";
import s from "../User.module.css";
import photo from "../../../assets/friend4.jpg";
import { UserType } from "../model/users-reducer";
import { NavLink } from "react-router-dom";

type UserProps = {
  user: UserType;
  isFollowingInProgressUsersId: Array<number>;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
};

export const User = ({
  user,
  isFollowingInProgressUsersId,
  unfollowUser,
  followUser,
}: UserProps) => {
  const followClickHandler = () => {
    followUser(user.id);
  };

  const unfollowClickHandler = () => {
    unfollowUser(user.id);
  };

  return (
    <div className={s.user_wrapper}>
      <div className={s.user_info}>
        <NavLink to={"profile/" + user.id}>
          <img
            src={user.photos.small != null ? user.photos.small : photo}
            alt="user"
          />
        </NavLink>

        {user.followed === true ? (
          <button
            disabled={isFollowingInProgressUsersId.some((id) => id === user.id)}
            onClick={unfollowClickHandler}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={isFollowingInProgressUsersId.some((id) => id === user.id)}
            onClick={followClickHandler}
          >
            Follow
          </button>
        )}
      </div>

      <div className={s.status_wrapper}>
        <h3>{user.name}</h3>
        <p className={s.status_text}>{user.status} </p>
      </div>

      <div className={s.location_wrapper}>
        <span>{"user.location.country"}</span>
        <span>{"user.location.city"}</span>
      </div>
    </div>
  );
};
