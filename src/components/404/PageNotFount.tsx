import React from "react";
import imgNotFount from "../../assets/images/404.png";
import s from './PageNotFount.module.css'

export const PageNotFount = () => {
  return (
    <div className={s.content}>
      <img className={s.notFountImg} src={imgNotFount} alt={"404"} />
    </div>
  );
};
