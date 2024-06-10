import React from 'react';
import loadingImg from '../../../assets/spinning-dots.svg';
import s from './Preloader.module.css'

export const Preloader = () => {
  return <div className={s.loadingWrapper}><img src={loadingImg} alt={'loading img'}/></div>;
};

