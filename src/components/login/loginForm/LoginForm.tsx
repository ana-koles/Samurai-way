import { minLengthCreator, required } from "../../../utils/validators/validators";
import { InjectedFormProps, reduxForm } from "redux-form";
import { LoginFormPropsType } from "../Login";
import { createField, Input } from "../../../components/common/formContolls/FormControls";
import s from '../Login.module.css'
import { Button } from "../../../components/button/Button";

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


export const LoginReduxForm = reduxForm<LoginFormPropsType, Captcha>({
  form: "login",
})(LoginForm);

