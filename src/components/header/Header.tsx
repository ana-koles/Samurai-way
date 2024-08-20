import React from 'react';
import logo from '../../assets/logo.svg';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectLogin } from './header-selectors';
import { logoutTC } from '../../features/auth/model/auth-reducer';
import { Button, Flex } from 'antd';


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

      <Flex gap='middle'  align='center' justify='flex-end'>
        <NavLink activeClassName={s.activeLink} to='/messages'>Chat</NavLink>
        <NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink>
        <span className={s.loginName}>{login}</span>
        <Button onClick={logOut}>logout</Button>
      </Flex>

      :
      <ul className={s.icon_list}>
          <li><NavLink to='/login'><span>Login</span></NavLink></li>
      </ul>
      }
    </header>
  );
};


/*       <ul className={s.icon_list}>
          <li><NavLink activeClassName={s.activeLink} to='/messages'>Chat</NavLink></li>
          <li><NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink></li> */
/*           <li className={s.loginName}>{login}</li>
          <li><Button onClick={logOut}>logout</Button></li>
      </ul> */