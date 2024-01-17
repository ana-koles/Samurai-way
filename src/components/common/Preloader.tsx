import React from 'react';
import loadingImg from '../../assets/spinning-dots.svg';
import s from '../users/User.module.css'

type PreloaderType = {
  
}

export const Preloader: React.FC<PreloaderType> = (props: PreloaderType) => {
  return <div className={s.loadingWrapper}><img src={loadingImg}/></div>;
};

