import axios from "axios"
import { UserType } from "./users-reducer"
import { UserProfileType, UserUpdatedProfileType } from "./profile-reducer"

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

export type LoginDataType = {
  email: string,
  password: string
  rememberMe: boolean | null
}

type ResponseType<T = {}> = {
  resultCode: number
  messages: string[],
  data: T
}

export type CatchaUrlType = {
  url: string
}

/*   withCredentials: true используется для включения передачи куки (cookies) вместе с запросом.
Это особенно важно, когда вы обращаетесь к серверу с использованием кросс-доменных запросов
(CORS - Cross-Origin Resource Sharing).*/

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
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
    return instance.delete<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
  },

  followUser(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`)
              .then(res => res.data)
  }
}

export const authApi = {
  getMeAuth() {
    return instance.get<ResponseType<UsersAuthDataType>>(`auth/me`)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null ) {
    return instance.post<ResponseType<{userId?: number}>>('auth/login', {email , password , rememberMe, captcha})
    .then(res => res.data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  }
}


export const profileApi = {
  getProfileData(userId: number) {
    return instance.get<UserProfileType>('profile/' + userId);
  },

  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
  },

  updateStatus(status: string) {
    return instance.put<ResponseType>('/profile/status', {status: status} )
  },

  savePhoto(file: File) {
    let formData = new FormData();
    formData.append("image", file);

    return instance.put<ResponseType<{photos: {small: string, large: string}}>>('/profile/photo', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  updateUserData(data: UserUpdatedProfileType) {
    return instance.put<ResponseType>('/profile', data)
  }
}

export const securityAPI = {
  getCatchaAPI() {
    return instance.get<CatchaUrlType>(`security/get-captcha-url`)
  }
}



