
import { changeIsFetchedAC, followUserTC, requestUsersTC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, toggleIsFollingInProgressAC, unfollowUserTC, updateFollowAC } from "../../model/users-reducer"
import { usersApi, UsersGetType } from "../../api/usersApi";
import { BaseResponseType } from "../../../../api/api";
jest.mock( "./users-reducer") //замокали объект к-ый импортируется по этому пути

const userApiMock = usersApi as jest.Mocked<typeof usersApi >;
// создаем фиктивную ф-цию. Jest позволяет делать ф-ции заглушку,
  // для проверки вызова, но без выполнения фактического кода
  //Это делается для того, чтобы иметь возможность отслеживать вызовы функции dispatch внутри санки.
let dispatchMock/* : Dispatch<AnyAction> | jest.Mock<any, any, any> */ = jest.fn()
let getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userApiMock.followUser.mockClear() // зачищаем моки
  userApiMock.unfollowUser.mockClear()
  userApiMock.getUsers.mockClear()
})

const result: BaseResponseType = {
  resultCode: 0,
  messages: [],
  data: {}
};

const getUsersResult: UsersGetType = {
  items: [],
  totalCount: 0,
  error: ''
}

userApiMock.followUser.mockReturnValue(Promise.resolve(result))
userApiMock.unfollowUser.mockReturnValue(Promise.resolve(result))
userApiMock.getUsers.mockReturnValue(Promise.resolve(getUsersResult))

test('follow thunk should be successful', async () => {
  const thunk = followUserTC(1)

  await thunk(dispatchMock)
  expect(dispatchMock).toHaveBeenCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollingInProgressAC(1, true))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, updateFollowAC(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollingInProgressAC(1, false))
});

test('unfollow thunk should be successful', async () => {
  const thunk = unfollowUserTC(2);
  await thunk(dispatchMock)
  expect(dispatchMock).toHaveBeenCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollingInProgressAC(2, true))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, updateFollowAC(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollingInProgressAC(2, false))
})

test('users should be received successfully', async() => {
  const thunk = requestUsersTC(10, 2)
  await thunk(dispatchMock)
  expect(dispatchMock).toHaveBeenCalledTimes(5);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, changeIsFetchedAC(true))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, setCurrentPageAC(2))

  const fakeData = {
    page: 2,
    pageSize: 10,
    totalCount: 100,
    error: null,
    items: [
      {
        id: 1,
        name: 'Dimych',
        status: 'offline',
        followed: false,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        }
      },
      {
        id: 2,
        name: 'Valera',
        status: 'online',
        followed: true,
        uniqueUrlName: null,photos: {
          small: null,
          large: null
        }
      }
    ]
  }
  expect(dispatchMock).toHaveBeenNthCalledWith(3, changeIsFetchedAC(false))
  expect(dispatchMock).toHaveBeenNthCalledWith(4, setUsersAC(fakeData.items))
  expect(dispatchMock).toHaveBeenNthCalledWith(5, setTotalUsersCountAC(fakeData.totalCount))
})