import axios from "axios"
import nProgress from "nprogress"
import "nprogress/nprogress.css"
import toast from "react-hot-toast"
import { Dispatch } from "redux"

import { setDetailUser, clearCurrentUser } from "../redux/reducers/userSlice"
import { axiosClient } from "./config/axios-client"

interface UserPassWord {
  email: string
}
interface GetUserProfile {
  statusCode: number
  isSuccess: boolean
  message: any
  error: string
  result: {
    userId: string
    userName: string
    fullName: string
    identityCard: string
    dateOfBirth: string
    gender: string
    avatar: string
    createdDate: string
  }
}

interface UserProfile {
  fullName: string
  identityCard: string
  dateOfBirth: string
  gender: string
  imageId?: number
}

interface Response {
  statusCode: number
  isSuccess: boolean
  message: string
  result: {
    fullName: string
    identityCard: string
    dateOfBirth: string
    gender: string
    avatar: string
    userId: string
    userName: string
    createdDate: string
  }
}

// interface ErrorResponse {
//   message: any
// }

export const ForgotPassword = async (
  email: string
): Promise<Response | void> => {
  try {
    nProgress.start()
    const response = await axiosClient.post<Response>(
      "/api/Accounts/forgot-password",
      {
        email: email
      }
    )
    nProgress.done()
    console.log(response)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data?.message || "An error occurred")
    } else {
      toast.error("An unknown error occurred")
    }
  }
}

export const ResetPassword = async (
  email: string,
  newPassword: string,
  confirmedNewPassword: string,
  token: string
): Promise<Response | void> => {
  try {
    nProgress.start()
    const response = await axiosClient.post<Response>(
      "/api/Accounts/reset-password",
      {
        email: email,
        newPassword,
        confirmedNewPassword,
        token
      }
    )
    nProgress.done()
    console.log(response)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data?.message || "An error occurred")
    } else {
      toast.error("An unknown error occurred")
    }
  }
}

export const CreateOrUpdateUserProfile = async (
  userProfile: UserProfile,
  dispatch: Dispatch
): Promise<Response | void> => {
  try {
    nProgress.start()
    const response = await axiosClient.post<Response>(
      "/api/UserDetails/create-update-user-detail",
      {
        fullName: userProfile.fullName,
        identityCard: userProfile.identityCard,
        dateOfBirth: userProfile.dateOfBirth,
        gender: userProfile.gender,
        imageId: userProfile.imageId
      }
    )
    nProgress.done()
    console.log(response)
    if (response.data.isSuccess) {
      toast.success("Cập nhật thông tin thành công!")
    }
   
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.errors?.[0]?.value || "An error occurred"
      toast.error(errorMessage)
    } else {
      throw error
    }
  }
}

export const GetUserProfile = async (
  dispatch: Dispatch
): Promise<GetUserProfile | void> => {
  try {
    nProgress.start()
    const response = await axiosClient.get<GetUserProfile>(
      "/api/UserDetails/get-user-detail-for-user"
    )
    //console.log(response.data.result)
    nProgress.done()
    if (response.data.isSuccess) {
      dispatch(setDetailUser(response.data.result))
    }
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        nProgress.done()
        console.log("Token has expired or is invalid.")
        toast.error("Your session has expired. Please log in again.")
        dispatch(clearCurrentUser());
      } else {
        toast.error(error.response.data?.statusCode || "Loi o day")
      }
    } else {
      toast.error("An unknown error occurred")
    }
  }
}
