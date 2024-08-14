import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserSearchFilterType } from "../model/users-reducer";

type SearchUsersFormPropsType = {
  changeUserSearchFilter: (filter: UserSearchFilterType) => void;
};

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

      onSubmit={(values: UserFormParams, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        setSubmitting(false);
        changeUserSearchFilter({term: values.term ?? ''})
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