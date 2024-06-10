import axios from "axios"
import { UserType } from "../redux/users-reducer"



/* export type LoginDataType = {
  email: string,
  password: string
  rememberMe: boolean | null
}
 */
export type BaseResponseType<T = {}> = {
  resultCode: number
  messages: string[],
  data: T
}



/*   withCredentials: true используется для включения передачи куки (cookies) вместе с запросом.
Это особенно важно, когда вы обращаетесь к серверу с использованием кросс-доменных запросов
(CORS - Cross-Origin Resource Sharing).*/

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  withCredentials: true,
                  headers: {
                    "API-KEY": "f8f6fe16-bb80-454f-8b60-979f91c82094"
                  }
})
/*
export const authApi = {
  getMeAuth() {
    return instance.get<BaseResponseType<UsersAuthDataType>>(`auth/me`)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null ) {
    return instance.post<BaseResponseType<{userId?: number}>>('auth/login', {email , password , rememberMe, captcha})
    .then(res => res.data)
  },
  logout() {
    return instance.delete<BaseResponseType>('auth/login')
  }
} */


/* export const profileApi = {
  getProfileData(userId: number) {
    return instance.get<UserProfileType>('profile/' + userId);
  },

  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
  },

  updateStatus(status: string) {
    return instance.put<BaseResponseType>('/profile/status', {status: status} )
  },

  savePhoto(file: File) {
    let formData = new FormData();
    formData.append("image", file);

    return instance.put<BaseResponseType<{photos: {small: string, large: string}}>>('/profile/photo', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  updateUserData(data: UserUpdatedProfileType) {
    return instance.put<BaseResponseType>('/profile', data)
  }
} */

/* export const securityAPI = {
  getCatchaAPI() {
    return instance.get<CaptchaUrlType>(`security/get-captcha-url`)
  }
}
 */


