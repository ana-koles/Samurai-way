import { BaseResponseType, instance, UsersGetType } from "./api"

export const usersApi = {
  getUsers(pageCount: number, currentPage: number) {
    //возвращаем не response, а response.data
    return instance.get<UsersGetType>(`users?count=${pageCount}&page=${currentPage}`)
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