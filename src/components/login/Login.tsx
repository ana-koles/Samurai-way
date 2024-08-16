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
