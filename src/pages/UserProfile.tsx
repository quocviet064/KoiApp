import { useEffect, useRef, useState } from "react"

import nProgress from "nprogress"
import "nprogress/nprogress.css"
import { FaBirthdayCake, FaIdCard, FaUserTie } from "react-icons/fa"
import { IoMdFemale, IoMdMale } from "react-icons/io"
import { TbGenderBigender } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "@/lib/redux/store"
import Avatar from "@/components/layout/header/Avatar"


const UserProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  )

  const [isHovered, setIsHovered] = useState(false) // State to handle hover effect
  const fileInputRef = useRef<HTMLInputElement>(null)
  //const [userProfile, setUserProfile] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const handleAvatarClick = () => {
    navigate("/Setting/profile", { state: { userProfile } })
  }

  const userProfile = useSelector((state: RootState) => state.users.detailUser)

  if (errorMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold">Phiên của bạn đã hết hạn</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative">
        <div className="h-48 w-full rounded-b-lg bg-gradient-to-r from-blue-400 to-red-300">
          <div className="absolute inset-0 flex items-center justify-center text-white"></div>
        </div>
        <div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleAvatarClick}
        >
          <div className="relative">
            <Avatar
              userImg={userProfile ? userProfile.avatar : "Loading..."}
              w="200px"
              h="200px"
            />

            {isHovered && (
              <div className="absolute inset-0 top-52 flex flex-row items-center justify-center rounded-full bg-black bg-opacity-50 p-4">
                <span className="text-sm font-semibold text-white">
                  Thay đổi Avatar
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold">
          {userProfile ? userProfile.userName : "Loading..."}
        </h2>
      </div>

      {/* Info Cards */}
      <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {/* Introduction Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">Giới thiệu</h3>
          <p className="mt-2 text-gray-600">
            <span className="inline-flex items-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.28 0 4.5-.91 6.23-2.65C19.96 8.5 20.5 6.28 20.5 4S19.96.5 18.23 2.65 14.28 4.5 12 4.5s-4.5-.91-6.23 2.65C5.04 8.5 4.5 10.72 4.5 13s1.91 4.5 4.65 4.5 4.65-.91 6.23-2.65"></path>
              </svg>
              Là thành viên từ {userProfile ? userProfile.createdDate : "Loading..."}
            </span>
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-start justify-start rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
          <div className="flex flex-col justify-start">
            <span className="my-4 inline-flex items-center gap-3">
              <p className="inline-flex items-center gap-3 font-semibold">
                <FaUserTie /> Họ và tên :
              </p>
              {userProfile ? userProfile.fullName : "Loading..."}
            </span>
            <span className="my-4 inline-flex items-center gap-3">
              <p className="inline-flex items-center gap-3 font-semibold">
                <FaIdCard /> Mã định danh :
              </p>
              {userProfile ? userProfile.identityCard : "Loading..."}
            </span>
            <span className="my-4 inline-flex items-center gap-3">
              <p className="inline-flex items-center gap-3 font-semibold">
                <TbGenderBigender /> Giới tính :
              </p>
              {userProfile ? userProfile.gender : "Loading..."}
            </span>
            <span className="my-4 inline-flex items-center gap-3">
              <p className="inline-flex items-center gap-3 font-semibold">
                <FaBirthdayCake /> Ngày/Năm sinh :
              </p>
              {userProfile ? userProfile.dateOfBirth : "Loading..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
