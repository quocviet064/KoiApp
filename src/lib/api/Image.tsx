import axios from "axios";
import { axiosClient } from "./config/axios-client";



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


interface ImageUploadResponse {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  result: { 
      altText: string;
      createdDate: string;
      filePath: string;
      id : number
      userId: string;
      userName: string;
  
    imageUrl: string;
    thumbnailUrl: string;
  };
  }
  
  
  export const uploadImage = async (
    filePath: File,
    //fileName : string
  ): Promise<number> => {
    try {
      const formData = new FormData();
      formData.append("file", filePath);
      //formData.append("altText", altText )
  
      const response = await axiosClient.post<ImageUploadResponse>(
        `/api/Images/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.result.id;
      
    } catch (error: any) {
      throw error;
    }
  };
  