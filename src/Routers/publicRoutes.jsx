import { Error403 } from '@/Pages/Errors/403/Error403'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import ForgotPassword from '@/Components/ForgotPassword/ForgotPassword'
import Register from '@/Components/ForgotPassword/RegisterComponents'

const Login = lazy(() => import('@/Pages/Login/Login'))
const Default = lazy(() => import('@/Pages/Default'))
// const Error403 = lazy(() => import('@/Pages/Errors/403/Error403'))

export const publicRoutes = (
  <>
    <Route path={'/'}>
      <Route index element={<Default />} />
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/error/403" element={<Error403 />} />
    </Route>
  </>
)
