import axios from "axios"
import { UserType } from "./users-reducer"
import { UserProfileType } from "./profile-reducer"

type UsersGetType = {
  items: UserType[]
  totalCount: number
  error: null | string
}

type UsersAuthDataType = {
  id: number,
  email: string,
  login: string
}

type RequestType<T = {}> = {
  resultCode: number
  messages: string[],
  data: T
}

/*   withCredentials: true используется для включения передачи куки (cookies) вместе с запросом.
Это особенно важно, когда вы обращаетесь к серверу с использованием кросс-доменных запросов
(CORS - Cross-Origin Resource Sharing).*/

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
                  headers: {
                    "API-KEY": "f8f6fe16-bb80-454f-8b60-979f91c82094"
                  }
})

export const usersApi = {
  getUsers(pageCount: number, currentPage: number) {
    //возвращаем не response, а response.data
    return instance.get<UsersGetType>(`users?count=${pageCount}&page=${currentPage}`)
            .then(response => response.data)
  },

  unfollowUser(userId: number){
    return instance.delete<RequestType>(`follow/${userId}`)
            .then(res => res.data)
  },

  followUser(userId: number) {
    return instance.post<RequestType>(`follow/${userId}`)
              .then(res => res.data)
  }
}

export const authApi = {
  getMeAuth() {
    return instance.get<RequestType<UsersAuthDataType>>(`auth/me`)
      .then(res => res.data)
  }
}


export const profileApi = {
  getProfileData(userId: number) {
    return instance.get<UserProfileType>('profile/' + userId);
  }
}


