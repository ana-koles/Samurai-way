import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { UserSearchFilterType } from "../model/users-reducer";

type UserFormParams = {
  term: UserSearchFilterType;
  friend?: boolean;
};

type UserFormErrors = {
  term?: {
    term?: string;
  };
  friend?: boolean;
};

type SearchUsersFormPropsType = {
  changeUserSearchFilter: (filter: UserSearchFilterType) => void;
};

const validate = (values: UserFormParams): UserFormErrors => {
  const errors: UserFormErrors = {term: {term: ''}, friend: false};
  if(!values.term.term) {
    errors.term = { term: 'Required' };
  }
  return errors
}

export const _SearchUsersForm = ({changeUserSearchFilter}: SearchUsersFormPropsType) => {
  return (
    <Formik
    initialValues={
      {
        term: {
          term: ''
        },
        friend: false }}
    validate={validate}
    onSubmit={(values) => {
/*         validate(values); */
      console.log(values)
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
  </Formik>

  )

}

/////////////////
type UserFormParams2 = {
  term: string;
};

type UserFormErrors2 = {
  term?: string
};


export const SearchUsersForm = ({changeUserSearchFilter}: SearchUsersFormPropsType) =>{
  return (
    <Formik
      initialValues={
        {
          term: ''
        }
      }

      onSubmit={(values: UserFormParams2, { setSubmitting }) => {
        changeUserSearchFilter(values)
      }}
    >
      <Form>
        <label htmlFor="term">term</label>
        <Field name="term" type="text" />
        <ErrorMessage name="term" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};