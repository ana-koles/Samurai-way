import React, { useEffect, Component } from 'react';
import s from './User.module.css'
import { UsersContainerPropsType } from './UsersContainer';
import catPhoto from '../../assets/friend4.jpg';
import { v1 } from 'uuid';
import photo from '../../assets/friend4.jpg';
import axios from 'axios';
import { UserType } from '../../redux/users-reducer';
import { Users } from './Users';


type UsersGetType = {
  items: UserType[]
  totalCount: number
  error: null | string
}

/* Если вы не определяете конструктор в своем классе, React будет использовать конструктор из базового класса Component, который инициализирует состояние (this.state) и пропсы (this.props).
Этот конструктор, в свою очередь, устанавливает this.props в значения, переданные компоненте в момент создания. */

export class UsersAPIComponent extends Component<UsersContainerPropsType>{

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

    return <Users totalUsersCount={this.props.totalUsersCount}
                  pageCount={this.props.pageCount}
                  currentPage={this.props.currentPage}
                  users={this.props.users}
                  updateFollow={this.props.updateFollow}
                  setCurrentPage={this.setCurrentPage}/>

  }
}
