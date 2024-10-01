import axios from "axios"
import { axiosClient } from "./config/axios-client"

interface UserPassWord {
  email: string
}

interface Response {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  result: {
    isSuccess: boolean;
    message: string;
  };
}

interface ErrorResponse {
  message: any
}

export const ForgotPassword = async (
  email: string
): Promise<Response | ErrorResponse> => {
  try {
    const response = await axiosClient.post<Response>(
      "/api/Accounts/forgot-password",
      {
        email: email
      }
    )
    console.log(response)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data?.message || "An error occurred"
      }
    } else {
      return {
        message: "An unknown error occurred"
      }
    }
  }
}



export const ResetPassword = async (
  email: string,
  newPassword: string,
  confirmedNewPassword: string,
  token: string,
): Promise<Response | ErrorResponse> => {
  try {
    const response = await axiosClient.post<Response>(
      "/api/Accounts/reset-password",
      {
        email: email,
        newPassword,
        confirmedNewPassword,
        token
      }
    )
    console.log(response)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data?.message || "An error occurred"
      }
    } else {
      return {
        message: "An unknown error occurred"
      }
    }
  }
}
