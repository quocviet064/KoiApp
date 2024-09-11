"use client"

import { useCallback, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import * as yup from "yup"

//import toast from "react-hot-toast";
//import ModalButton from "./ModalBtn";
import useLoginModal from "@/hooks/useLoginModal"
import useSignupModal from "@/hooks/useSignupModal"

import Input from "../Input"
import Heading from "../ModalHead"
import Modal from "./Modal"

const emailUsernameRegex = /^[a-zA-Z0-9.]+$/

// Define the form schema with Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(
      emailUsernameRegex,
      "Email is invalid. Only letters (a-z), numbers (0-9), and periods (.) are allowed."
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required")
})

// Define types for the form data
interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const SignupModal: React.FC = () => {
  const signupModal = useSignupModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  //   const onSubmit: SubmitHandler<FormData> = useCallback(
  //     async (data) => {
  //       try {
  //         setIsLoading(true);
  //         const emailWithDomain = `${data.email}@gmail.com`;
  //         await registerUser(emailWithDomain, data.name, data.password);
  //         setIsLoading(false);
  //         registerModal.onClose();
  //         OTPconfirmModal.onOpen(emailWithDomain);
  //         toast.success("Please verify your email to finish register!");
  //       } catch (error: any) {
  //         if (error.response && error.response.status === 400) {
  //           toast.error("Email already exists!");
  //         } else {
  //           toast.error("Something went wrong");
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     },
  //     [registerModal, OTPconfirmModal]
  //   );

  const toggle = useCallback(() => {
    signupModal.onClose()
    loginModal.onOpen()
  }, [loginModal, signupModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng bạn đến với KoiFish!"
        subtitle="Hãy tạo tài khoản nào!"
      />

      <Input
        id="email"
        label="Email"
        domain="@gmail.com"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input
        id="name"
        label="Tên của bạn"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Input
        id="password"
        type="password"
        label="Mật khẩu"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Input
        id="confirmPassword"
        type="password"
        label="Nhập lại mật khẩu"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <div className="mt-4 text-center font-semibold text-sm">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Đã có tài khoản?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Đăng nhập
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={signupModal.isOpen}
      title="Đăng ký"
      actionLabel={
        isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Tiếp tục"
      }
      onClose={signupModal.onClose}
      //onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default SignupModal
