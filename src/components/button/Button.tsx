import React from 'react';

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

    <button type={props.type ? props.type : 'button'} onClick={onClickHandler}>{props.name}</button>

  );
};

