import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { UserSearchFilterType } from "../model/users-reducer";

type SearchUsersFormPropsType = {
  changeUserSearchFilter: (filter: UserSearchFilterType) => void;
};


/* export const _SearchUsersForm = ({changeUserSearchFilter}: SearchUsersFormPropsType) => {
  return (
    <Formik
      initialValues={
        {
          term: '',
          friend: false }
      }
      validate={validate}
      onSubmit={(values) => {
/*         validate(values); */
/*         console.log(values)
        changeUserSearchFilter(values.term)
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >

    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="term.term"/>
        <ErrorMessage name="term.term" component="div" />
        <Field type="checkbox" name="friend" />
        <ErrorMessage name="friend" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik> */

/*   )  */

/* } */

/////////////////
type UserFormParams = {
  term?: string;
  friend?: boolean
};

const validate = (values: UserFormParams): UserFormParams => {
  const errors: UserFormParams = {};
  if(!values.term) {
    errors.term = 'Required';
  }
  return errors
}

export const SearchUsersForm = ({changeUserSearchFilter}: SearchUsersFormPropsType) =>{
  return (
    <Formik
      initialValues = {
        {
          term: '',
          friend: false
        }
      }
      validate={validate}

      onSubmit={(values: UserFormParams, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          changeUserSearchFilter({term: values.term ?? ''})
        }, 400);

      }}
    >
      <Form>
        <Field name="term" type="text" />
        <ErrorMessage name="term" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};