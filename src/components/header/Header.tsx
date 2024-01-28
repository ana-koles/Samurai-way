import React from 'react';
import logo from '../../assets/logo.svg';
import photo from '../../assets/cat-profile2.jpg';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';
import { UserDataType } from './HeaderComponent';
import { UserProfileType } from '../../redux/profile-reducer';


type HeaderPropsType = {
  login: string | null
  isAuth: boolean
  profile: UserProfileType | null
}

export const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType) => {
  return (
    <header className={s.header}>

      <div className={s.logo_wrapper}>
        <img src={logo} alt="logo" />
        <h2>CATSBOOK</h2>
      </div>

      <ul className={s.icon_list}>
        <li><NavLink activeClassName={s.activeLink} to='/messages'>Chat</NavLink></li>
        <li><NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink></li>
        {props.isAuth ?
          <li><NavLink to='/auth'><span>{props.login}</span><img src={props.profile?.photos.small
            ? props.profile?.photos.small
            : photo} alt="photo" /></NavLink></li>
          :
          <li><NavLink to='/auth'><span>Login</span></NavLink></li>}

      </ul>

    </header>
  );
};
