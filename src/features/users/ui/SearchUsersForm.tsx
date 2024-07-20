import { ErrorMessage, Field, Form, Formik } from "formik";

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

export const SearchUsersForm = () => (
  <div>
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
