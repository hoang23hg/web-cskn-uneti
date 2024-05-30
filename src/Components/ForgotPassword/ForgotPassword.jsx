import { useState } from 'react'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (email === '' || email === null || email === undefined) {
      return toast.error('Vui lòng nhập email!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }

    // Call API to handle password reset
    try {
      // const response = await apiResetPassword({ email })
      // if (response.success) {
      //   toast.success('Email khôi phục mật khẩu đã được gửi!', {
      //     position: 'top-right',
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'light',
      //   })
      // } else {
      //   throw new Error('Error')
      // }
    } catch (error) {
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-10 bg-white rounded-xl shadow-lg">
        <h3 className="font-semibold uppercase text-2xl text-sky-700 mb-10 text-center">
          Khôi phục mật khẩu
        </h3>
        <form onSubmit={handleResetPassword} className="flex flex-col">
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
        <button
          type="submit"
          className="px-3 py-2 rounded-full bg-white text-sky-800 font-semibold border border-sky-800 hover:bg-sky-800 hover:text-white"
        >
          Khôi phục mật khẩu
        </button>
      </form>
    </div>
  </section>
)
}

export default ForgotPassword
