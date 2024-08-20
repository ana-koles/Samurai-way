import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import s from '../PostSection.module.css'
import { maxLenghtCreator, required } from '../../../../../utils/validators/validators';
import { Textarea } from '../../../../../components/common/formContolls/FormControls';



export type PostFormDataType = {
  newPostMessage: string
}

const maxLength30 = maxLenghtCreator(30); //выносим ф-цию отдельно, т.к у нас будет зацикливание, если мы добавим ее в validate


const PostForm: React.FC<InjectedFormProps<PostFormDataType>> = (props:InjectedFormProps<PostFormDataType>) => {

  return (
    <div className={s.post_input}>
      <form  onSubmit={props.handleSubmit}>
        <Field
                type='text'
                component={Textarea}
                name='newPostMessage'
                placeholder='Your text...'
                validate={[required, maxLength30]}
        />
      {/* <Button type='submit' name='post'/> */}
      <Button type='submit' name='post'/>
    </form>

    </div>
  );
};

export const PostReduxForm = reduxForm<PostFormDataType>({
  form: 'post'
})(PostForm);

