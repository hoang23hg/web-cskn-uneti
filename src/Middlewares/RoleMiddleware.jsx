import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { decryptAESWithKey } from '@/Services/Utils/stringUtils'

function RoleMiddleware(props) {
  const { allowedRoles } = props
  const dataSV = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  let role = null
  if (dataSV) {
    role = decryptAESWithKey(dataSV.Role)
  } else if (dataCBGV) {
    role = decryptAESWithKey(dataCBGV.Role)
  } else {
    role = null
  }
  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/error/403" />
  )
}

RoleMiddleware.propTypes = {
  allowedRoles: PropTypes.array,
}

export default RoleMiddleware
