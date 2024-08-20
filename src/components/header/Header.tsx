import React from 'react';
import logo from '../../assets/logo.svg';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';
import { Button } from '../button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectLogin } from './header-selectors';
import { logoutTC } from '../../features/auth/model/auth-reducer';


type HeaderPropsType = {}

export const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType) => {

  const login = useSelector(selectLogin)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(logoutTC())
  }



  return (
    <header className={s.header}>

      <div className={s.logo_wrapper}>
        <img src={logo} alt="logo" />
        <h2>Connectify</h2>
      </div>
      {isAuth
      ?
      <ul className={s.icon_list}>
          <li><NavLink activeClassName={s.activeLink} to='/messages'>Chat</NavLink></li>
          <li><NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink></li>
          <li className={s.loginName}>{login}<Button callback={logOut} name={'logout'}/></li>
      </ul>

      :
      <ul className={s.icon_list}>
          <li><NavLink to='/login'><span>Login</span></NavLink></li>
      </ul>
      }
    </header>
  );
};
