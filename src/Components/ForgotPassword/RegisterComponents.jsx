import { useState } from 'react'
import { toast } from 'react-toastify'
import { post_Register } from '@/Apis/apiForgot'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userType, setUserType] = useState('personal')
  const [avatar, setAvatar] = useState(null)
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [contact, setContact] = useState('')
  const [paidSubscription, setPaidSubscription] = useState('')

  const navigate = useNavigate()

  const handleSubmitRegister = async () => {
    const userData = {
      Dang_Nguoi_Dang_TenNguoiDung: username,
      Dang_Nguoi_Dang_MatKhau: password,
      Dang_Nguoi_Dang_HoTen: fullName,
      Dang_Nguoi_Dang_LoaiNguoiDung: userType === 'personal' ? '0' : '1',
      Dang_Nguoi_Dang_AnhDaiDien: avatar,
      Dang_Nguoi_Dang_Email: email,
      Dang_Nguoi_Dang_DonVi: organization,
      Dang_Nguoi_Dang_LienHe: contact,
      Dang_Nguoi_Dang_UuTien: paidSubscription ? 'Tôi muốn đăng ký trả phí cho doanh nghiệp về đăng bài' : ''
    }
    try {
      const res = await post_Register(userData)
      if (res.status === 200) {
        Swal.fire({
          title: 'Thành công!',
          text: 'Chúc mừng bạn đã đăng ký thành công tài khoản.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/dang-nhap')  // Chuyển hướng đến giao diện đăng nhập
        })
      } else {
        throw new Error('Có lỗi xảy ra trong quá trình đăng ký!')
      }
    } catch (error) {
      console.log('Lỗi: ', error)
      Swal.fire({
        title: 'Lỗi!',
        text: 'Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!username || !password || !confirmPassword || !fullName || !email) {
      toast.error('Vui lòng điền đầy đủ thông tin!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }

    await handleSubmitRegister()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setAvatar(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-[400px] p-10 bg-white rounded-xl shadow-lg">
        <h3 className="font-semibold uppercase text-2xl text-sky-700 mb-10 text-center">
          Tạo tài khoản
        </h3>
        <form onSubmit={handleRegister} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="font-semibold text-sky-900">
              Tài khoản
            </label>
            <input
              id="username"
              type="text"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              placeholder="Tài khoản"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="font-semibold text-sky-900">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="confirmPassword" className="font-semibold text-sky-900">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              placeholder="Xác nhận mật khẩu"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="fullName" className="font-semibold text-sky-900">
              Họ tên
            </label>
            <input
              id="fullName"
              type="text"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              placeholder="Họ tên"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="userType" className="font-semibold text-sky-900">
              Loại người dùng
            </label>
            <select
              id="userType"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="personal">Tài khoản cá nhân</option>
              <option value="business">Tài khoản doanh nghiệp</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="avatar" className="font-semibold text-sky-900">
              Ảnh đại diện
            </label>
            <input
              id="avatar"
              type="file"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="font-semibold text-sky-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="organization" className="font-semibold text-sky-900">
              Đơn vị
            </label>
            <input
              id="organization"
              type="text"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              placeholder="Đơn vị"
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="contact" className="font-semibold text-sky-900">
              Liên hệ
            </label>
            <input
              id="contact"
              type="text"
              className="px-4 py-2 border border-slate-300 rounded-full outline-none"
              placeholder="Liên hệ"
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          {userType === 'business' && (
            <div className="flex flex-col mb-4">
              <label htmlFor="paidSubscription" className="font-semibold text-sky-900">
                Tôi muốn đăng ký trả phí cho doanh nghiệp về đăng bài:
              </label>
              <textarea
                id="paidSubscription"
                className="px-4 py-2 border border-slate-300 rounded-lg outline-none"
                value={paidSubscription}
                onChange={(e) => setPaidSubscription(e.target.value)}
                placeholder="Nhập thông tin về đăng ký trả phí cho doanh nghiệp!"
              />
            </div>
          )}
          <button
            type="submit"
            className="px-3 py-2 rounded-full bg-white text-sky-800 font-semibold border border-sky-800 hover:bg-sky-800 hover:text-white"
          >
            Tạo tài khoản
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register
