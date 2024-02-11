import React from 'react';
import s from './Login.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { loginTC } from '../../redux/auth-reducer';

//тип данных полей формы
export type LoginFormPropsType = {
  email: string
  password: string
  rememberMe: boolean
}

type LoginPageType = {

}

export const LoginPage: React.FC<LoginPageType> = (props: LoginPageType) => {
  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormPropsType) => { //будут содержать данные из формы и вызыватся при отправке формы на сервер
    dispatch(loginTC(formData))
  }

  return (
    <LoginReduxForm onSubmit={onSubmit}/> // обертка для формы 
  )
}



//component for standard form
const LoginForm: React.FC<InjectedFormProps<LoginFormPropsType>> = (props: InjectedFormProps<LoginFormPropsType>) => {
  return (
    <div className={s.content}>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}> {/*  принимает вводные данные формы, вызовет ф-цию, к-ая пришла из пропсов - onSubmit  */}
        <div><Field type="text" placeholder='Email' name='email' component={'input'}/></div>
        <div><Field type="password" placeholder='Password' name='password' component={'input'}/></div>
        <div><Field type="checkbox" name='rememberMe' component={'input'}/>Remember me</div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};




//оборачиваем форму контейнерной компонентой (HOC)
const LoginReduxForm = reduxForm<LoginFormPropsType>({
  form: 'login', //присваиваем уникальное название форме
})(LoginForm)


