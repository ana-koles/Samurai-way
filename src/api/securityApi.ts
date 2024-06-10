import { instance } from "./api"

export type CaptchaUrlType = {
  url: string
}

export const securityAPI = {
  getCatchaAPI() {
    return instance.get<CaptchaUrlType>(`security/get-captcha-url`)
  }
}
