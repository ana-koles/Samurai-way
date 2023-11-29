import React from 'react';

type ButtonPropsType = {
  name: string
  callback: () => void
}

export const Button:React.FC<ButtonPropsType> = (props) => {

const onClickHandler = () => {
  props.callback();
}

  return (

    <button onClick={onClickHandler}>{props.name}</button>

  );
};

