import React from 'react';
import s from './Login.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginTC } from '../../redux/auth-reducer';
import { Input, createField } from '../common/formContolls/FormControls';
import { minLengthCreator, required } from '../../utils/validators/validators';
import { AppRootStateType } from '../../redux/redux-store';
import { Redirect } from 'react-router-dom';

//тип данных полей формы
export type LoginFormPropsType = {
  email: string
  password: string
  rememberMe: boolean | false
}

type MapDispatchToPropsType = {
  logIn: (email: string, password: string, rememberMe: boolean ) => void
}

type MapStateToPropsType = {
  isAuth: boolean
}

type LoginPagePropsType = MapDispatchToPropsType & MapStateToPropsType


const LoginPage = (props: LoginPagePropsType) => {
  
  const onSubmit = (data: LoginFormPropsType) => { //будут содержать данные из формы и вызыватся при отправке формы на сервер
    props.logIn(data.email, data.password, data.rememberMe)
    //dispatch(loginTC(data.email, data.password, data.rememberMe))
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'}/> //если мы залогинены, но перекидывать на профль
  }

  return (
    <LoginReduxForm onSubmit={onSubmit}/> // обертка для формы
  )
}


export const minLenght6 = minLengthCreator(6)

//component for standard form
const LoginForm: React.FC<InjectedFormProps<LoginFormPropsType>> = (props: InjectedFormProps<LoginFormPropsType>) => {


  return (
    <div className={s.content}>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}> {/*  принимает вводные данные формы, вызовет ф-цию, к-ая пришла из пропсов - onSubmit  */}
        {createField({type: 'text', placeholder: 'Email', name: 'email', component: Input, validators: [required]})}
        {createField({type: 'password', placeholder: 'Password', name:'password', component: Input, validators: [required, minLenght6]})}
        {createField({type: 'checkbox', name: 'rememberMe', component: Input, text: 'Remember me'})}

       {/*  без использования ф-ции CreateFiel */}
        {/* <div><Field type="text" placeholder='Email' name='email' component={Input} validate={[required]}/></div> */}
        {/* <div><Field type="password" placeholder='Password' name='password' component={Input} validate={[required, minLenght6]}/></div> */}
       {/*  <div><Field type="checkbox" name='rememberMe' component={Input} />Remember me</div> */}

        {props.error && <div className={s.errorWrapper} ><span className={s.error}>{props.error}</span></div>}

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};




//оборачиваем форму контейнерной компонентой (HOC)
const LoginReduxForm = reduxForm<LoginFormPropsType>({
  form: 'login', //присваиваем уникальное название форме
})(LoginForm)


const MapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth
}
)

//делаем контейнерную компоненту, чтобы loginPAge получит доступ к store
export const LoginPageContainer = connect(MapStateToProps, {logIn: loginTC})(LoginPage); //есл нам не нужны MapStateToProps,  обозначаем их как null

/* Здесь автоматически connect к каждому значению свойства применяет dispatch,
создавая таким образом callback как в ф-ции mapDispatchToProps, т.е. как
updateFollow: (userId: number) => {
  dispatch(UpdateFollowAC(userId))
},  станет props.updateFollow: (userId: number) */
