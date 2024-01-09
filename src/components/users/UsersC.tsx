import React, { useEffect, Component } from 'react';
import s from './User.module.css'
import { UsersContainerPropsType } from './UsersContainer';
import catPhoto from '../../assets/friend4.jpg';
import { v1 } from 'uuid';
import photo from '../../assets/friend4.jpg';
import axios from 'axios';
import { UserType } from '../../redux/users-reducer';


type UsersGetType = {
  items: UserType[]
  totalCount: number
  error: null | string
}


/* Если вы не определяете конструктор в своем классе, React будет использовать конструктор из базового класса Component, который инициализирует состояние (this.state) и пропсы (this.props).
Этот конструктор, в свою очередь, устанавливает this.props в значения, переданные компоненте в момент создания. */

export class Users extends Component<UsersContainerPropsType>{

  getUsers = () => {
    if (this.props.users.length === 0) {
      axios.get<UsersGetType>('https://social-network.samuraijs.com/api/1.0/users')
      .then((response) => this.props.setUsers(response.data.items))

      /*   [
          {
          id: v1(),
          photo: photo,
          followed: true,
          name: 'Whiskers',
          status: `Missing my human right meow`,
          location: {
            city: 'Boston',
            country: 'USA'
          }
          },
          {
          id: v1(),
          photo: photo,
          followed: false,
          name: 'Oliver',
          status: `Trying out a new toy today`,
          location: {
            city: 'London',
            country: 'UK'
          }
          },
          {
          id: v1(),
          photo: photo,
          name: 'Leo',
          followed: true,
          status: `Knocked a glass off the table, just to see what would happen`,
          location: {
            city: 'Milan',
            country: 'Italy'
          }
          },
          {
          id: v1(),
          photo: photo,
          name: 'Milo',
          followed: false,
          status: `Just had a gourmet meal of fresh salmon`,
          location: {
            city: 'Rome',
            country: 'Italy'
          }
          }
        ] */
    }
  }

  render () { //обязательно наличие метода render(), чтобы вернуть JSX
    return (
      <div className={s.content}>
        <button onClick={this.getUsers}>Get Users</button>
        {this.props.users.map(user => <div key={user.id} className={s.user_wrapper}>
            <div className={s.user_info}>
              <img src={user.photos.small != null ? user.photos.small : photo} alt="user" />
              {user.followed === true ? <button onClick={() => this.props.updateFollow(user.id)}>Follow</button> : <button onClick={() => this.props.updateFollow(user.id)}>Unfollow</button>}
            </div>

            <div className={s.status_wrapper}>
              <h3>{user.name}</h3>
              <p className={s.status_text}>{user.status} </p>
            </div>

            <div className={s.location_wrapper}>
              <span>{"user.location.country"}</span>
              <span>{"user.location.city"}</span>
            </div>

          </div>)}
      </div>

    );
  }
}
