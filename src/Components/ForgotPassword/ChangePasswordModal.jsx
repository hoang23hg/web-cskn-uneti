import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { put_ChangePassword } from '@/Apis/apiChangePass'
import Swal from 'sweetalert2'

function ChangePasswordModal({ isOpen, onClose, onChangePassword }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAgreed, setIsAgreed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Mật khẩu mới và xác nhận mật khẩu không khớp!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return
    }
    if (!isAgreed) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Bạn phải đồng ý để đổi mật khẩu!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return
    }

    try {
      const response = await put_ChangePassword({
        Dang_Nguoi_Dang_MatKhau: newPassword,
      })
      if (response.status === 200) {
        onChangePassword(currentPassword, newPassword)
        Swal.fire({
          title: 'Thành công!',
          text: 'Bạn đã đổi mật khẩu thành công.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        handleReset()
        onClose()
      } else {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Đổi mật khẩu thất bại!',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      console.error('Error changing password:', error)
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const handleReset = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsAgreed(false)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl mb-4">Đổi mật khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Mật khẩu hiện tại</label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mật khẩu mới</label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                required
              />
              Tôi đồng ý đổi mật khẩu
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Hủy
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
}

export default ChangePasswordModal
