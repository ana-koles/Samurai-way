import { Field, Form, Formik } from "formik";
import { UserSearchFilterType, UsersFilter } from "../model/users-reducer";

type SearchUsersFormPropsType = {
  changeUserSearchFilter: (filter: UserSearchFilterType) => void;
};

type UserFormParams = {
  term: string;
  friend: 'null' | 'true' | 'fales'
};

export const SearchUsersForm = ({changeUserSearchFilter}: SearchUsersFormPropsType) =>{

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
      initialValues = {
        {
          term: '',
          friend: 'null'
        }
      }
/*       validate={validate} */
      onSubmit={submit}
    >
      {({ isSubmitting, setFieldValue, values, handleSubmit  }) => (
        <Form>
          <div>
            <Field
              as="select"
              id="friend"
              name="friend"
/*               onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                setFieldValue('friend', e.target.value);
                handleSubmit()
              }} */
            >
              <option>Select users</option>
              <option value="null">All users</option>
              <option value="true">Followed</option>
              <option value="false">Unfollowed</option>
            </Field>

          </div>
          <Field name="term" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};