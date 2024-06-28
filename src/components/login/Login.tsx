import React from "react";
import s from "./Login.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginTC } from "../../features/auth/model/auth-reducer";
import { Input, createField } from "../common/formContolls/FormControls";
import { minLengthCreator, required } from "../../utils/validators/validators";
import { AppRootStateType } from "../../redux/redux-store";
import { Redirect } from "react-router-dom";
import { Button } from "../button/Button";

//тип данных полей формы

export type LoginFormPropsType = {
  email: string;
  password: string;
  rememberMe: boolean | false;
  captcha: string | null;
};

type MapDispatchToPropsType = {
  logIn: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void;
};

type MapStateToPropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type LoginPagePropsType = MapDispatchToPropsType & MapStateToPropsType;

const LoginPage = (props: LoginPagePropsType) => {
  const onSubmit = (data: LoginFormPropsType) => {
     props.logIn(data.email, data.password, data.rememberMe, data.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />; //если мы залогинены, но перекидывать на профль
  }

  return (
    <LoginReduxForm
      onSubmit={onSubmit}
      captchaUrl={props.captchaUrl}
    />
  );
};

export const minLenght6 = minLengthCreator(6);

type Captcha = { captchaUrl: string | null };

const LoginForm = (
  props: Captcha & InjectedFormProps<LoginFormPropsType, Captcha>
) => {
  return (
    <div className={s.content}>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
        {" "}
             {createField({
          type: "text",
          placeholder: "Email",
          name: "email",
          component: Input,
          validators: [required],
        })}
        {createField({
          type: "password",
          placeholder: "Password",
          name: "password",
          component: Input,
          validators: [required, minLenght6],
        })}
        {createField({
          type: "checkbox",
          name: "rememberMe",
          component: Input,
          text: "Remember me",
        })}
        {props.error && (
          <div className={s.errorWrapper}>
            <span className={s.error}>{props.error}</span>
          </div>
        )}
        {props.captchaUrl && (
          <>
            <img className={s.captcha} src={props.captchaUrl} alt={"captcha"} />
            {createField({
              type: "text",
              placeholder: "Symbols from image",
              name: "captcha",
              component: Input,
              validators: [required],
            })}
          </>
        )}
        <Button name={"Submit"} type="submit" />
      </form>
    </div>
  );
};


const LoginReduxForm = reduxForm<LoginFormPropsType, Captcha>({
  form: "login",
})(LoginForm);

const MapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export const LoginPageContainer = connect(MapStateToProps, { logIn: loginTC })(
  LoginPage
);