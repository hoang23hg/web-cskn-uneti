import http from '@/Configs/http'

// API đăng ký tài khoản
export const post_Register = (formData) => {
  return http.post('Register_Nguoi_Dung/RegisterRoutes', 
  formData, )
}