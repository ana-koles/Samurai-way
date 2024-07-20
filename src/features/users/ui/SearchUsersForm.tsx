import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserSearchFilterType } from "../model/users-reducer";

type UserFormParams = {
  term: UserSearchFilterType;
  friend?: boolean;
};

type UserFormErrors = {
  term?: {
    term?: string;
  };
  friend?: string;
};

const validate = (values: UserFormParams): UserFormErrors => {
  const errors: UserFormErrors = {term: {term: ''}};
  if(!values.term.term) {
    errors.term = { term: 'Required' };
    console.log(errors)
  }
  return errors
}

export const SearchUsersForm = () => (
  <div>
    <Formik
      initialValues={{ term: {term: ''}, friend: false }}
      validate={validate}
      onSubmit={(values) => {
        validate(values);

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
  </div>
);
