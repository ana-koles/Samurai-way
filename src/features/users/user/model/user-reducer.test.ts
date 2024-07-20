import { updateFollowAC, usersReducer, UsersType } from "../../model/users-reducer";

let initialState: UsersType;

beforeEach(() => {
  initialState = {
    users: [ {
        id: 1,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        followed: false,
        name: 'Whiskers',
        status:'Missing my human right meow',
      },
      {
        id: 2,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        followed: false,
        name: 'Bob',
        status:'Missing my human right meow',
      },
      {
        id: 3,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        followed: true,
        name: 'Lily',
        status:'Missing my human right meow',
      },
      {
        id: 4,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        followed: true,
        name: 'Pinky',
        status:'Missing my human right meow',
      },
    ],
    currentPage: 1,
    totalUsersCount: 0,
    pageCount: 10,
    isFetched: false,
    isFollowingInProgressUsersId: [],
    filter: {
      term: ''
    }
  }
})


test('user is successfully folled', () => {
  let action = updateFollowAC(2)
  const updatedState: UsersType = usersReducer(initialState, action)
  expect(updatedState.users[0].followed).toBeFalsy()
  expect(updatedState.users[1].followed).toBeTruthy();
})

test('user is successfully unfollowed', () => {
  let action = updateFollowAC(4)
  const updatedState: UsersType = usersReducer(initialState, action)
  expect(updatedState.users[2].followed).toBeTruthy()
  expect(updatedState.users[3].followed).toBeFalsy()
})