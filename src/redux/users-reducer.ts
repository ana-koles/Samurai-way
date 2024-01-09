import { v1 } from "uuid"
import photo from '../assets/friend4.jpg'

/* export type UserType = {
  id: string
  photo: string
  followed: boolean
  name:  string
  status: string
  location: {
    city: string
    country: string
  }
} */


export type UserType = {
  name: string
  id: number
  uniqueUrlName: null
  photos: {
    small: null | string,
    large: null | string
},
  status: null,
  followed: boolean
}


export type UsersType = {
  users: UserType[]
  currentPage: number
  totalUsersCount: number
  pageCount: number
}


let usersInitialState: UsersType = {
  users: [/*
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
    }, */
  ],
  currentPage: 2,
  totalUsersCount: 0,
  pageCount: 5
}

const UPDATE_FOLLOW = 'UPDATE-FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

type UpdateFollowType = ReturnType<typeof UpdateFollowAC>;
type SetUsersType = ReturnType<typeof SetUsersAC>;
type SetCurrentPage = ReturnType<typeof SetCurrentPageAC>
type SetTotalUsersCount = ReturnType<typeof SetTotalUsersCountAC>

export type UsersPageActionType = UpdateFollowType | SetUsersType | SetCurrentPage | SetTotalUsersCount


export const usersReducer = (state: UsersType = usersInitialState , action: UsersPageActionType): UsersType => {

  switch(action.type) {
    case UPDATE_FOLLOW:
      let newState = {...state, users: state.users.map(user => user.id === action.userId ? {...user, followed: !user.followed} : user )};
      return newState

    case SET_USERS:

      return {...state, users: [...action.users]}

    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage}

    case SET_TOTAL_USERS_COUNT:
      return {...state, totalUsersCount: action.count}

      default:
        return state;
  }
}

//возможно userId надо будет исрпавить на string
export const UpdateFollowAC = (userId: number) => ({type: UPDATE_FOLLOW, userId: userId} as const);

export const SetUsersAC = (users: UserType[]) => ({type: SET_USERS, users: users} as const);

export const SetCurrentPageAC = (currentPage: number) => {
  return {type: SET_CURRENT_PAGE, currentPage} as const
}

export const SetTotalUsersCountAC = (totalUsersCount: number) => {
  return {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} as const
}

