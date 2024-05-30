import axios from 'axios'
import {
  tokenFailure,
  tokenStart,
  tokenSuccess,
} from '@/Services/Redux/Slice/authSlice.js'
import {
  userFailure,
  userStart,
  userSuccess,
} from '@/Services/Redux/Slice/userSlice.js'
import http from '@/Configs/http.js'
import { UAParser } from 'ua-parser-js'
import { encryptAESWithKey } from '@/Services/Utils/stringUtils'

// data token
export const apiLogin = async ({ TenDangNhap, MatKhau }, dispatch) => {
  dispatch(tokenStart())

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt_NguoiDung/Login_NguoiDung`,
      {
        TenDangNhap: encryptAESWithKey(TenDangNhap),
        MatKhau: encryptAESWithKey(MatKhau),
      },
    )

    if (res.status === 200) {
      dispatch(tokenSuccess(res.data))
      return res.data
    }
  } catch (error) {
    dispatch(tokenFailure())
  }
}

// data user
export const userSVLogin = async (username, dispatch) => {
  dispatch(userStart())
  try {
    const res = await http.post(`/SP_MC_MaSinhVien/Load_Web_App_Para`, username)

    if (res.status === 200) {
      dispatch(userSuccess(res.data?.body[0]))
      return res.data?.body[0]
    }
  } catch (error) {
    dispatch(userFailure())
  }
}

export const userGVLogin = async (
  { username, password },
  dispatch,
  navigate,
) => {
  dispatch(userStart())
  try {
    const res = await http.post(`/SP_HT_USER_GIANGVIEN/Load_MaND_HRM`, {
      HT_USER_TenDN: username,
      HT_USER_MK: password,
    })
    if (res.status === 200) {
      dispatch(userSuccess(res.data?.body[0]))
      navigate('/uneti')
      return res.data?.body[0]
    }
  } catch (error) {
    dispatch(userFailure())
  }
}

export const refreshDataToken = async (refreshToken = '') => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt/RefreshToken`,
      { refreshToken },
    )
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    console.log(error)
  }
}
