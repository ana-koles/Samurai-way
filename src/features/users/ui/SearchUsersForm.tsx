import { Field, Form, Formik } from "formik";
import { UserSearchFilterType, UsersFilter } from "../model/users-reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../model/users-selectors";
import { memo } from "react";

type SearchUsersFormPropsType = {
  changeUserSearchFilter: (filter: UserSearchFilterType) => void;
};

type FriendFormParamsTypes = 'null' | 'true' | 'false'

type UserFormParams = {
  term: string;
  friend: FriendFormParamsTypes
};

export const SearchUsersForm = memo(({changeUserSearchFilter}: SearchUsersFormPropsType) => {
  const currentFilterValues = useSelector(getUsersFilter)

  const submit = (values: UserFormParams, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
    const filterValues: UsersFilter = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    changeUserSearchFilter(filterValues)
    setSubmitting(false) // todo: check how to disable submit button while there is a requst for users
  }

  return (
    <Formik
      enableReinitialize
      initialValues = {
        {
          term: currentFilterValues.term,
          friend: String(currentFilterValues.friend) as FriendFormParamsTypes
        }
      }
      onSubmit={submit}
    >
      {({ isSubmitting}) => (
        <Form>
          <div>
            <Field
              as="select"
              id="friend"
              name="friend"
            >
              <option>Select users</option>
              <option value="null">All users</option>
              <option value="true">Followed</option>
              <option value="false">Unfollowed</option>
            </Field>

          </div>
          <Field name="term"/>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
});