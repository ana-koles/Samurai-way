import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserSearchFilterType } from "../model/users-reducer";

type SearchUsersFormPropsType = {
  changeUserSearchFilter: (filter: UserSearchFilterType) => void;
};

type UserFormParams = {
  term?: string;
  friend?: boolean
};

export const SearchUsersForm = ({changeUserSearchFilter}: SearchUsersFormPropsType) =>{

  const validate = (values: UserFormParams): UserFormParams => {
    const errors: UserFormParams = {};
    if(!values.term) {
      errors.term = 'Required';
    }
    return errors
  }

  const submit = (values: UserFormParams, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
    changeUserSearchFilter({term: values.term ?? ''})
    setSubmitting(false) // todo: check how to disable submit button while there is a requst for users
  }

  return (
    <Formik
      initialValues = {
        {
          term: '',
          friend: false
        }
      }
      validate={validate}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="term" name="term" />
          <ErrorMessage name="term" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};