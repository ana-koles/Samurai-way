import React from "react";
import s from "./Users.module.css";
import { UserType } from "../model/users-reducer";
import { Preloader } from "../../../components/common/preloader/Preloader";
import { User } from "../user/ui/User";
import { Pagination } from "../../../components/common/pagination/Pagination";
import { Formik, useFormik } from "formik";

type UsersPropsType = {
  totalUsersCount: number;
  pageCount: number;
  currentPage: number;
  users: UserType[];
  isFetched: boolean;
  isFollowingInProgressUsersId: Array<number>;
  setCurrentPage: (pageNumber: number) => void;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
};

export const Users = (props: UsersPropsType) => {
  return (
    <div className={s.content}>
      {props.isFetched ? <Preloader /> : ""}

      <SearchUsersForm/>

      <Pagination
        totalItemsCount={props.totalUsersCount}
        pageCount={props.pageCount}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
      />

      {props.users.map((user) => (
        <User
          key={user.id}
          user={user}
          isFollowingInProgressUsersId={props.isFollowingInProgressUsersId}
          followUser={props.followUser}
          unfollowUser={props.unfollowUser}
        />
      ))}
    </div>
  );
};


const SearchUsersForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
}