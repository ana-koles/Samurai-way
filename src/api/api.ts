import axios from "axios"

export type BaseResponseType<T = {}> = {
  resultCode: number
  messages: string[],
  data: T
}

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  withCredentials: true,
                  headers: {
                    "API-KEY": "7acd530f-0027-4872-b2c8-c8ac89cfd8da"
                  }
})


