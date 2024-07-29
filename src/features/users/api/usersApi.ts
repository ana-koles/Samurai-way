import { UserType } from "../model/users-reducer"
import { BaseResponseType, instance } from "../../../api/api"

export type UsersGetType = {
  items: UserType[]
  totalCount: number
  error: null | string
}


export const usersApi = {
  getUsers(pageCount: number, currentPage: number, term: string) {
    return instance.get<UsersGetType>(`users?count=${pageCount}&page=${currentPage}&term=${term}`)
            .then(response => response.data)
  },

  unfollowUser(userId: number){
    return instance.delete<BaseResponseType>(`follow/${userId}`)
            .then(res => res.data)
  },

  followUser(userId: number) {
    return instance.post<BaseResponseType>(`follow/${userId}`)
              .then(res => res.data)
  }
}