import s from "./Login.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../features/auth/model/auth-reducer";
import { Input, createField } from "../common/formContolls/FormControls";
import { minLengthCreator, required } from "../../utils/validators/validators";
import { AppRootStateType } from "../../redux/redux-store";
import { Redirect } from "react-router-dom";
import { Button } from "../button/Button";
import { LoginReduxForm } from "./loginForm/LoginForm";

export type LoginFormPropsType = {
  email: string;
  password: string;
  rememberMe: boolean | false;
  captcha: string | null;
};

/* type MapDispatchToPropsType = {
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
}; */

/* type LoginPagePropsType = MapDispatchToPropsType & MapStateToPropsType; */

type LoginPageProps = {

}

export const LoginPage = () => {
  const captchaUrl = useSelector((state: AppRootStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = (data: LoginFormPropsType) => {
    dispatch(loginTC(data.email, data.password, data.rememberMe, data.captcha));
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <LoginReduxForm
      onSubmit={onSubmit}
      captchaUrl={captchaUrl}
    />
  );
}
/*
const LoginPage = (props: LoginPagePropsType) => {
  const onSubmit = (data: LoginFormPropsType) => {
    props.logIn(data.email, data.password, data.rememberMe, data.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <LoginReduxForm
      onSubmit={onSubmit}
      captchaUrl={props.captchaUrl}
    />
  );
};

export const minLenght4 = minLengthCreator(4);

type Captcha = { captchaUrl: string | null };

const LoginForm = (
  props: Captcha & InjectedFormProps<LoginFormPropsType, Captcha>
) => {
  return (
    <div className={s.content}>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
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
          validators: [required, minLenght4],
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
        <div className={s.commonLoginDataSection}>
          <p>or use common test account credentials:</p>
          <p> Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </div>

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
); */