import React from 'react';
import s from './Button.module.css'

type ButtonPropsType = {
  name: string
  callback?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button:React.FC<ButtonPropsType> = (props) => {

const onClickHandler = () => {
  if( props.callback) {
    props.callback();
  }

}

  return (

    <button className={s.button} type={props.type ? props.type : 'button'} onClick={onClickHandler}>{props.name}</button>

  );
};

