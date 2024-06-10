import { BaseResponseType, instance } from "../../../api/api"


type UsersAuthDataType = {
  id: number,
  email: string,
  login: string
}

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
}
