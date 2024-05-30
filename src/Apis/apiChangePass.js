import http from '@/Configs/http'

export const put_ChangePassword = (data = {}) => {
    return http.put(
      'ChangePassword_Nguoi_Dung/ChangePassword_NguoiDung',
      data,
    )
  }