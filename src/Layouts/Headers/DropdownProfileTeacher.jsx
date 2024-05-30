import PropTypes from 'prop-types'
import { useState } from 'react'
import { MdLogout, MdNotificationImportant, MdInstallDesktop } from 'react-icons/md'
import DropdownProfileItem from './DropdownProfileItem'
import ChangePasswordModal from '@/Components/ForgotPassword/ChangePasswordModal'

function DropdownProfileTeacher({ handleLogout, onChangePassword }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleChangePassword = (currentPassword, newPassword) => {
    onChangePassword(currentPassword, newPassword)
    setIsModalOpen(false)
  }


  return (
    <>
      <div className="p-3" aria-labelledby="user-menu-button">
        <DropdownProfileItem
          to="tthc-giang-vien/theo-doi-quy-trinh"
          icon={<MdNotificationImportant className="text-xl" />}
          text="Theo dõi đề nghị"
        />
        <DropdownProfileItem
          onClick={handleOpenModal}
          icon={<MdInstallDesktop className="text-xl" />}
          text="Đổi mật khẩu"
        />
        <DropdownProfileItem
          onClick={handleLogout}
          icon={<MdLogout className="text-xl" />}
          text="Đăng xuất"
        />
      </div>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onChangePassword={handleChangePassword}
      />
    </>
  )
}

DropdownProfileTeacher.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
}

export default DropdownProfileTeacher
