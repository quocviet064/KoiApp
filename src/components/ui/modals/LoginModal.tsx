import { useCallback, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import * as yup from "yup"

import useLoginModal from "@/hooks/useLoginModal"
import useSignupModal from "@/hooks/useSignupModal"

import Input from "../Input"
import Heading from "../ModalHead"
import Modal from "./Modal"
import Button from "./ModalBtn"

// Define the schema with yup
const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required")
})

interface LoginFormData {
  email: string
  password: string
}

const LoginModal = () => {
  //const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const signupModal = useSignupModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(schema)
  })

  const toogle = useCallback(() => {
    loginModal.onClose()
    signupModal.onOpen()
  }, [loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng !"
        subtitle="Hãy điền thông tin đăng nhập của bạn"
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <div className="mt-4 text-center text-sm font-semibold">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Bạn là người mới ? </div>
          <div
            onClick={toogle}
            className="cursor-pointer text-sm hover:underline"
          >
            Tạo tài khoản ở đây
          </div>
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-semibold">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Quên mật khẩu? </div>
          <div
            onClick={toogle}
            className="cursor-pointer text-sm hover:underline"
          >
            Ở đây
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Đăng nhập"
      actionLabel={
        isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Tiếp tục"
      }
      onClose={loginModal.onClose}
      //onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
