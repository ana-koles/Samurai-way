import React from 'react';
import s from './Login.module.css'

type LoginPropsType = {

}

export const LoginPage: React.FC<LoginPropsType> = (props: LoginPropsType) => {
  return (
    <div className={s.content}>
      <h1>LOGIN</h1>
    </div>
  );
};

