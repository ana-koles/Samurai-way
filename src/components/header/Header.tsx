import React from 'react';
import logo from '../../assets/logo.svg';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';
import { Button } from '../button/Button';


type HeaderPropsType = {
  login: string | null
  isAuth: boolean
  logOut: () => void
}

export const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType) => {
  return (
    <header className={s.header}>

      <div className={s.logo_wrapper}>
        <img src={logo} alt="logo" />
        <h2>CATSBOOK</h2>
      </div>

      {props.isAuth
      ?

      <ul className={s.icon_list}>
          <li><NavLink activeClassName={s.activeLink} to='/messages'>Chat</NavLink></li>
          <li><NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink></li>
          <li className={s.loginName}>{props.login}<Button callback={props.logOut} name={'logout'}/></li>
      </ul>

      :
      <ul className={s.icon_list}>
          <li><NavLink to='/login'><span>Login</span></NavLink></li>
      </ul>
      }
    </header>
  );
};


//{/* <li><NavLink to='/profile'><span>{props.login}</span><img src={photo} alt="photo" /></NavLink></li> */}