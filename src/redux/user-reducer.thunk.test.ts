import { Dispatch, AnyAction } from "redux";
import { ResponseType, usersApi } from "./api"
import { followUserTC, toggleIsFollingInProgressAC, unfollowUserTC, updateFollowAC } from "./users-reducer"
jest.mock( "./users-reducer") //замокали объект к-ый импортируется по этому пути

const userApiMock = usersApi as jest.Mocked<typeof usersApi >;

let dispatchMock: Dispatch<AnyAction> | jest.Mock<any, any, any>;

beforeEach(() => {
  dispatchMock = jest.fn() // создаем фиктивную ф-цию. Jest позволяет делать ф-ции заглушку,
  // для проверки вызова, но без выполнения фактического кода
  //Это делается для того, чтобы иметь возможность отслеживать вызовы функции dispatch внутри санки.
  userApiMock.followUser.mockClear() // зачищаем моки
  userApiMock.unfollowUser.mockClear()
})

const result: ResponseType = {
  resultCode: 0,
  messages: [],
  data: {}
};

userApiMock.followUser.mockReturnValue(Promise.resolve(result))

test('follow thunk should be successful', async () => {
  const thunk = followUserTC(1) //TC возвращает санку

  await thunk(dispatchMock)
  //вызывает созданную санку followUserTC и передает в нее dispatchMock в качестве аргумента.
  // После этого санка будет запущена с фиктивной функцией dispatchMock вместо реального диспетчера Redux.
  // Это позволяет проверить, какие действия (action) будут переданы в dispatch, когда санка выполняется.
  expect(dispatchMock).toHaveBeenCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollingInProgressAC(1, true)) //указываем actions для каждого из 3х вызовов
  expect(dispatchMock).toHaveBeenNthCalledWith(2, updateFollowAC(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollingInProgressAC(1, false))
});

test('ufollow thunk should be successful', async () => {
  const thunk = unfollowUserTC(2);
  await thunk(dispatchMock)
  expect(dispatchMock).toHaveBeenCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollingInProgressAC(2, true)) //указываем actions для каждого из 3х вызовов
  expect(dispatchMock).toHaveBeenNthCalledWith(2, updateFollowAC(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollingInProgressAC(2, false))
})