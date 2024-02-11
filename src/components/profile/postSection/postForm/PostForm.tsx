import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import s from '../PostSection.module.css'
import { Button } from '../../../button/Button';



export type PostFormDataType = {
  newPostMessage: string
}

const PostForm: React.FC<InjectedFormProps<PostFormDataType>> = (props:InjectedFormProps<PostFormDataType>) => {

  //const newPostElement: React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  return (
    <div className={s.post_input}>
      <form  onSubmit={props.handleSubmit}>{/* внутри handleSubmit будет preventDefault, сбор данных формы и вызов callback для передачи данных из формы */}
        <Field
                type='text'
                component='textarea'
                name='newPostMessage'
                placeholder='Your text...'
        />
      <Button type='submit' name='post'/>
    </form>

    </div>
  );
};

export const PostReduxForm = reduxForm<PostFormDataType>({
  form: 'post'
})(PostForm);

