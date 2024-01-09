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

  constructor (props: UsersContainerPropsType) {
    super(props)
    if (this.props.users.length === 0) { //чтобы данные загружались сразу при загрузке страницы
      axios.get<UsersGetType>('https://social-network.samuraijs.com/api/1.0/users')
      .then((response) => this.props.setUsers(response.data.items))
    }
  }

  componentDidMount(): void {
    //чтобы данные загружались сразу при загрузке страницы

      axios.get<UsersGetType>(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${this.props.currentPage}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount / 500);
      });

  }

  setCurrentPage = (currentPageNumber: number) => {
    this.props.setCurrentPage(currentPageNumber);

    //здесь в &page=${currentPageNumber}`) нужно именно указывать currentPageNumber
    // а не this.props.currentPAge, потому что к этому момоенту запрос не будет знать обновленное значение currentPage
    axios.get<UsersGetType>(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${currentPageNumber}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
      }
        );

  }

  render () { //обязательно наличие метода render(), чтобы вернуть JSX

    let totalPageCount = Math.ceil(this.props.totalUsersCount / this.props.pageCount);
    const totalPageCountArr = [];
    for (let i = 1; i <= totalPageCount; i++) {
      totalPageCountArr.push(i);
    }

    return (

      <div className={s.content}>
        {totalPageCountArr.map(page => {
          return <span key={page + 156789} className={`${s.page_number} ${this.props.currentPage === page ? s.page_current : ''}`} onClick={(e) => this.setCurrentPage(page)}>  {page}  </span>
        })}


        {/* <button onClick={this.getUsers}>Get Users</button> */}
        {this.props.users.map(user => <div key={user.id + Math.random()} className={s.user_wrapper}>
            <div className={s.user_info}>
              <img src={user.photos.small != null ? user.photos.small : photo} alt="user" />
              {user.followed === true ? <button onClick={() => this.props.updateFollow(user.id)}>Unfollow</button> : <button onClick={() => this.props.updateFollow(user.id)}>Follow</button>}
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
