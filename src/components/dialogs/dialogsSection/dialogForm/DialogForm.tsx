import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import s from '../DialogsSection.module.css'

import { Button } from '../../../button/Button';

export type DialogFormDataType = {
  currentMessageText: string
}


const DialogForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props:InjectedFormProps<DialogFormDataType> ) => {
  return (
    <div className={s.message_input}>
      <form onSubmit={props.handleSubmit}>
        <Field
                    placeholder='Enter message...'
                    component='textarea'
                    name='currentMessageText'
                    type='text'
        />
      <Button type='submit' name='post'/>

      </form>

    </div>
  );
};


export const DialogReduxForm = reduxForm<DialogFormDataType>({
  form: 'dialog'
})(DialogForm)