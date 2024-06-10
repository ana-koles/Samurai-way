import { UserProfileType, UserUpdatedProfileType } from "../redux/profile-reducer";
import { BaseResponseType, instance } from "./api";

export const profileApi = {
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
}
