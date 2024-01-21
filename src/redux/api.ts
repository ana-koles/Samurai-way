import axios from "axios"
import { UserType } from "./users-reducer"

type UsersGetType = {
  items: UserType[]
  totalCount: number
  error: null | string
}

type RequestType<T = {}> = {
  resultCode: number
  messages: string[],
  data: T
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
                  headers: {
                    "API-KEY": "f8f6fe16-bb80-454f-8b60-979f91c82094"
                  }
})

export const usersApi = {
  getUsers(pageCount: number, currentPage: number) {
    //возвращаем не response, response.data
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



