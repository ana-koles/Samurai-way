import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import s from '../DialogsSection.module.css'
import { maxLenghtCreator, required } from '../../../../../../utils/validators/validators';
import { Textarea } from '../../../../../../components/common/formContolls/FormControls';
import { Button } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';


export type DialogFormDataType = {
  currentMessageText: string
}

const maxLength100 = maxLenghtCreator(100)

const DialogForm = (props:InjectedFormProps<DialogFormDataType> ) => {

  return (
    <div className={s.message_input}>
      <form onSubmit={props.handleSubmit}>
        <Field
          placeholder='Enter message...'
          component={Textarea}
          validate={[required, maxLength100]}
          name='currentMessageText'
          type='text'
        />
  {/*       <Button type='submit' name='post'/> */}
        <Button type='primary' htmlType='submit'>post</Button>
      </form>
    </div>
  );
};

export const DialogReduxForm = reduxForm<DialogFormDataType>({
  form: 'dialog'
})(DialogForm)