import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import s from '../PostSection.module.css'
import { Button } from '../../../button/Button';
import { maxLenghtCreator, required } from '../../../../utils/validators/validators';
import { Textarea } from '../../../common/formContolls/FormControls';



export type PostFormDataType = {
  newPostMessage: string
}

const maxLength30 = maxLenghtCreator(30); //выносим ф-цию отдельно, т.к у нас будет зацикливание, если мы добавим ее в validate


const PostForm: React.FC<InjectedFormProps<PostFormDataType>> = (props:InjectedFormProps<PostFormDataType>) => {

  //const newPostElement: React.LegacyRef<HTMLTextAreaElement> = React.createRef();

  return (
    <div className={s.post_input}>
      <form  onSubmit={props.handleSubmit}>{/* внутри handleSubmit будет preventDefault, сбор данных формы и вызов callback для передачи данных из формы */}
        <Field
                type='text'
                /* component='textarea' */
                component={Textarea} //если применяем свою компоненту, то помещаем ее в {}
                name='newPostMessage'
                placeholder='Your text...'
                validate={[required, maxLength30]}
                tagName = 'textarea' //для передачи в FormContols
        />
      <Button type='submit' name='post'/>
    </form>

    </div>
  );
};

export const PostReduxForm = reduxForm<PostFormDataType>({
  form: 'post'
})(PostForm);

