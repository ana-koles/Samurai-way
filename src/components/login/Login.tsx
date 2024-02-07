import React from 'react';
import s from './Login.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

//названия полей формы
type LoginFormPropsType = {
  login: string
  password: string
  rememberMe: boolean
}

//component for standard form
const LoginForm: React.FC<InjectedFormProps<LoginFormPropsType>> = (props: InjectedFormProps<LoginFormPropsType>) => {
  return (
    <div className={s.content}>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
        <div><Field type="text" placeholder='Login' name='login' component={'input'}/></div>
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

type LoginPageType = {

}

export const LoginPage: React.FC<LoginPageType> = (props: LoginPageType) => {
  const onSubmit = (formData: LoginFormPropsType) => {

  }

  return (
    <LoginReduxForm onSubmit={onSubmit}/>
  )
}