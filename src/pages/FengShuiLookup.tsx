import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { GetUserProfile } from "@/lib/api/User"
import { RootState } from "@/lib/redux/store"

import InputField from "@/components/global/atoms/InputField"
import SubmitButton from "@/components/global/atoms/SubmitButton"
import ToggleSwitch from "@/components/global/atoms/ToggleSwitch"

import "../styles/fengshui.css"

interface UserProfile {
  fullName: string
  dateOfBirth: string
  gender: string
}

const FengShuiLookup: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [isToggled, setIsToggled] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)

  const currentUser = useSelector((state: RootState) => state.users.currentUser)
  const userProfile: UserProfile | null = useSelector(
    (state: RootState) => state.users.detailUser
  )

  useEffect(() => {
    if (!userProfile && currentUser) {
      dispatch(GetUserProfile())
    }
  }, [dispatch, currentUser, userProfile])

  const isProfileComplete = (user: UserProfile): boolean => {
    return (
      user.fullName.trim() !== "" &&
      user.dateOfBirth.trim() !== "" &&
      user.gender.trim() !== ""
    )
  }

  const extractDateParts = (date: string) => {
    const [day, month, year] = date
      .split("/")
      .map((part) => part.padStart(2, "0"))
    return { day, month, year }
  }

  const handleToggle = () => {
    const newToggleState = !isToggled
    setIsToggled(newToggleState)

    if (newToggleState && userProfile && isProfileComplete(userProfile)) {
      console.log("Profile complete, filling form.")

      setName(userProfile.fullName)
      setGender(userProfile.gender)

      const { day, month, year } = extractDateParts(userProfile.dateOfBirth)

      console.log(`Day: ${day}, Month: ${month}, Year: ${year}`)

      setDay(day)
      setMonth(month)
      setYear(year)

      setIsReadOnly(true)
    } else {
      setName("")
      setGender("")
      setDay("")
      setMonth("")
      setYear("")
      setIsReadOnly(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    navigate("/ket-qua", {
      state: {
        name,
        gender,
        birthDate: `${day}/${month}/${year} (DL)`,
        useAccountInfo: isToggled
      }
    })
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundColor: "#000"
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center text-white"
        style={{
          width: "1600px",
          height: "822px",
          backgroundImage: `url('https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/12/hinh-nen-vu-tru-72.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: `'Roboto', sans-serif`
        }}
      >
        <h1 className="mb-4 text-4xl font-bold">
          TRA CỨU MỆNH PHONG THỦY CÁ KOI
        </h1>
        <p className="mb-8 text-center">
          Mỗi con người sinh ra đều có vận mệnh khác nhau.
        </p>
        <div className="relative w-full max-w-md rounded-lg bg-white bg-opacity-10 p-8">
          <h2 className="mb-4 text-2xl font-bold">GIẢI MÃ CUỘC ĐỜI BẠN</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Họ Và Tên"
              value={name}
              onChange={setName}
              id="name"
              readOnly={isReadOnly}
            />

            <div className="flex space-x-4">
              <InputField
                label="Giới tính"
                value={gender}
                onChange={setGender}
                id="gender"
                type="select"
                options={["", "Nam", "Nữ"]}
                disabled={isReadOnly}
              />
              <InputField
                label="Năm sinh"
                value={year}
                onChange={setYear}
                id="year"
                type="select"
                options={Array.from(
                  { length: 100 },
                  (_, index) => `${2023 - index}`
                )}
                disabled={isReadOnly}
              />
            </div>
            <div className="flex space-x-4">
              <InputField
                label="Tháng sinh"
                value={month}
                onChange={setMonth}
                id="month"
                type="select"
                options={[
                  "",
                  ...Array.from(
                    { length: 12 },
                    (_, index) => `${(index + 1).toString().padStart(2, "0")}`
                  )
                ]}
                disabled={isReadOnly}
              />
              <InputField
                label="Ngày sinh"
                value={day}
                onChange={setDay}
                id="day"
                type="select"
                options={[
                  "",
                  ...Array.from(
                    { length: 31 },
                    (_, index) => `${(index + 1).toString().padStart(2, "0")}`
                  )
                ]}
                disabled={isReadOnly}
              />
            </div>
            {userProfile && (
              <ToggleSwitch
                isToggled={isToggled}
                onToggle={handleToggle}
                labelOn="Nhập thông tin mới"
                labelOff="Sử dụng từ tài khoản đăng nhập"
              />
            )}

            <div className="mt-8 flex justify-center">
              <SubmitButton label="Giải mã" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FengShuiLookup
