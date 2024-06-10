import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import s from '../DialogsSection.module.css'

import { Button } from '../../../button/Button';
import { Textarea } from '../../../common/formContolls/FormControls';
import { maxLenghtCreator, required } from '../../../../utils/validators/validators';

export type DialogFormDataType = {
  currentMessageText: string
}

const maxLength50 = maxLenghtCreator(50)

const DialogForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props:InjectedFormProps<DialogFormDataType> ) => {
  return (
    <div className={s.message_input}>
      <form onSubmit={props.handleSubmit}>
        <Field
                    placeholder='Enter message...'
                    //component='textarea'
                    component={Textarea}
                    validate={[required, maxLength50]}
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