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

type UserFormParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
};



const validate = (values: UserFormParams) => {
  const errors: UserFormParams = {}
  if(!values.firstName) {
    errors.firstName = 'Required'
  } else {
    if(values.firstName) {
      if (values.firstName?.length < 2) {
        errors.firstName = 'Must be 2 characters or more'
      }
      if (values.firstName?.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
      }
    }
  }

  if(!values.lastName) {
    errors.lastName = 'Required'
  } else {
    if(values.lastName) {
      if (values.lastName?.length < 2) {
        errors.lastName = 'Must be 2 characters or more'
      }
      if (values.lastName?.length > 15) {
        errors.lastName = 'Must be 15 character or less'
      }
    }
  }

  if(!values.email){
    errors.email = 'Required'
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}


const SearchUsersForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
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
      {formik.errors.firstName && <div>{formik.errors.firstName}</div>}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName && <div>formik.errors.lastName</div>}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && <div>{formik.errors.email}</div>}

      <button type="submit">Submit</button>
    </form>
  );
}