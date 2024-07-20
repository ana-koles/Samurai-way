import React from "react";
import s from "./Users.module.css";
import { UserType } from "../model/users-reducer";
import { Preloader } from "../../../components/common/preloader/Preloader";
import { User } from "../user/ui/User";
import { Pagination } from "../../../components/common/pagination/Pagination";
import { ErrorMessage, Field, Form, Formik } from "formik";

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


/////////////

type UserFormParams = {
  term?: string;
  friend?: boolean;
};


const validate = (values: UserFormParams) => {
  const errors: UserFormParams = {}
  if(!values.term) {
    errors.term = 'Required'
  }
  return errors
}

const SearchUsersForm = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ term: '', friend: false }}
      validate={validate}
      onSubmit={(values) => {
        validate(values);
    }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term"/>
          <ErrorMessage name="term" component="div" />
          <Field type="checkbox" name="friend" />
          <ErrorMessage name="friend" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);
