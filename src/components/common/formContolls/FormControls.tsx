import React, { ReactNode, TextareaHTMLAttributes } from 'react';
import s from './FormControls.module.css'

type  TextareaProps = {
  input: {
    name: string;
    value: string;
  };
  meta: {
    active: boolean;
    asyncValidating: boolean;
    autofilled: boolean;
    dirty: boolean;
    error: string | undefined; // ошибку может и не быть, поэтому используем | undefined
    form: string;
    invalid: boolean;
    pristine: boolean;
    submitting: boolean;
    submitFailed: boolean;
    touched: boolean;
    valid: boolean;
    visited: boolean;
  };
  type: string;
  placeholder: string;
}

type ChildrenType = {
  children: ReactNode;
}

type CommonInputType = TextareaProps & ChildrenType


const FormCreateor: React.FC<CommonInputType> = ({input, meta, children, ...restProps}) => {

  return (
    <div>
      <div className={meta.error && meta.touched ? s.error : ''}>
        {children} {/* в качестве children придет texarea и Input */}
    </div>
    <div className={s.spanWrapper}>
      {meta.error && meta.touched && <span>{meta.error}</span> } {/* показывать только если есть ошибка и поле было посещено */}
    </div>

    </div>

  );

}

export const Textarea: React.FC<TextareaProps> = (props: TextareaProps) => {
  const {input, meta, ...restProps} = props;

  return (
    <FormCreateor {...props}><textarea {...input} {...restProps}/></FormCreateor>

  );
};

export const Input: React.FC<TextareaProps> = (props: TextareaProps) => {
  const {input, meta, ...restProps} = props;

  return (
    <FormCreateor {...props}> <input {...input} {...restProps}/>{/*  таким образом мы передадим все, кроме meta */}</FormCreateor>

  );
}
















//первоначальные варианты

export const _Textarea = (props: TextareaProps) => {
  const {input, meta, ...restProps} = props;

  return (
    <div>
      <div className={meta.error && meta.touched ? s.error : ''}>
        <textarea {...input} {...restProps}/>{/*  таким образом мы передадим все, кроме meta */}
    </div>
    <div className={s.spanWrapper}>
      {meta.error && meta.touched && <span>{meta.error}</span> } {/* показывать только если есть ошибка и поле было посещено */}
    </div>

    </div>

  );
};


export const _Input = (props: TextareaProps) => {
  const {input, meta, ...restProps} = props;

  return (
    <div>
      <div className={meta.error && meta.touched ? s.error : ''}>
        <input {...input} {...restProps}/>{/*  таким образом мы передадим все, кроме meta */}
    </div>
    <div className={s.spanWrapper}>
      {meta.error && meta.touched && <span>{meta.error}</span> } {/* показывать только если есть ошибка и поле было посещено */}
    </div>

    </div>

  );
};
