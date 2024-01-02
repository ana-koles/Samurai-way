import { v1 } from "uuid"

export type UserType = {
  id: string
  followed: boolean
  name:  string
  status: string
  location: {
    city: string
    country: string
  }
}

export type UsersType = {
  users: UserType[]
}


let usersInitialState: UsersType = {
  users: [
    {
      id: v1(),
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
      followed: false,
      name: 'Oliver',
      status: `rying out a new toy today`,
      location: {
        city: 'London',
        country: 'UK'
      }
    },
    {
      id: v1(),
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
      name: 'Milo',
      followed: false,
      status: `Just had a gourmet meal of fresh salmon`,
      location: {
        city: 'Rome',
        country: 'Italy'
      }
    },
  ],
}

const UPDATE_FOLLOW = 'UPDATE-FOLLOW';
const SET_USERS = 'SET-USERS';

type UpdateFollowType = ReturnType<typeof UpdateFollowAC>;
type SetUsersType = ReturnType<typeof SetUsersAC>;

export type UsersPageActionType = UpdateFollowType | SetUsersType


export const usersReducer = (state: UsersType = usersInitialState , action: UsersPageActionType): UsersType => {
  switch(action.type) {
    case UPDATE_FOLLOW:
      return {...state, users: state.users.map(user => user.id === action.userId ? {...user, follwed: !user.followed} : user )};

    case SET_USERS:
      return {...state, users: [...state.users, ...action.users]}

      default:
        return state;
  }
}

export const UpdateFollowAC = (userId: string) => ({type: UPDATE_FOLLOW, userId: userId} as const);

export const SetUsersAC = (users: UserType[]) => ({type: SET_USERS, users: users} as const);


