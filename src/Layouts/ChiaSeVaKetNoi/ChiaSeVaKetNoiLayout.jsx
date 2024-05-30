import BannerTLHTView from '@/Components/ChiaSeVaKetNoi/TaiLieuHocTap/Banner/BannerTLHTView'
import { useNamespace } from '@/Services/Hooks'
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { IoBook } from 'react-icons/io5'
import { GiHouse } from 'react-icons/gi'
import { BiSolidStore } from 'react-icons/bi'
import { FaUserGear } from 'react-icons/fa6'
import { BsFilePost } from 'react-icons/bs'
import { GoHomeFill } from 'react-icons/go'
import FormBaiDangCSKN from '@/Components/ChiaSeVaKetNoi/BaiDangCSKN/FormBaiDangCSKN'

function ChiaSeVaKetNoiLayout() {
  const bem = useNamespace('cskn')
  return (
    <section className={[bem.b('wrapper'), ' sticky']}>
      <div className="">
        <BannerTLHTView />
      </div>
      <div className="grid grid-cols-12 gap-4 my-4">
        <aside className={[bem.e('aside'), ' col-span-2']}>
          <div className="w-full sticky top-32">
            {/* Start: Danh mục */}
            <ul>
              <li>
                <p className="uppercase font-bold text-2xl mb-4">Danh mục</p>
              </li>
              <li>
                <NavLink
                  to={''}
                  className={
                    'font-medium flex items-center gap-x-2 mb-2 p-2 hover:bg-gray-200 hover:rounded-md hover:text-uneti-primary'
                  }
                >
                  <GoHomeFill size={32} />
                  Chia sẻ và kết nối
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'tai-lieu-hoc-tap'}
                  className={({ isActive }) => {
                    return [
                      'font-medium flex items-center gap-x-2 mb-2 p-2',
                      isActive
                        ? ' bg-gray-200 rounded-md text-uneti-primary'
                        : ' hover:bg-gray-200 hover:rounded-md hover:text-uneti-primary',
                    ].join(' ')
                  }}
                >
                  <IoBook size={32} />
                  Tài liệu học tập
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'nha-o'}
                  className={({ isActive }) => {
                    return [
                      'font-medium flex items-center gap-x-2 mb-2 p-2',
                      isActive
                        ? ' bg-gray-200 rounded-md text-uneti-primary'
                        : ' hover:bg-gray-200 hover:rounded-md hover:text-uneti-primary',
                    ].join(' ')
                  }}
                >
                  <GiHouse size={32} />
                  Nhà ở
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'do-dung-ca-nhan'}
                  className={({ isActive }) => {
                    return [
                      'font-medium flex items-center gap-x-2 mb-2 p-2',
                      isActive
                        ? ' bg-gray-200 rounded-md text-uneti-primary'
                        : ' hover:bg-gray-200 hover:rounded-md hover:text-uneti-primary',
                    ].join(' ')
                  }}
                >
                  <BiSolidStore size={32} />
                  Đồ dùng cá nhân
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'viec-lam'}
                  className={({ isActive }) => {
                    return [
                      'font-medium flex items-center gap-x-2 mb-2 p-2',
                      isActive
                        ? ' bg-gray-200 rounded-md text-uneti-primary'
                        : ' hover:bg-gray-200 hover:rounded-md hover:text-uneti-primary',
                    ].join(' ')
                  }}
                >
                  <FaUserGear size={32} />
                  Việc làm
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'bai-dang-cua-toi'}
                  className={({ isActive }) => {
                    return [
                      'font-medium flex items-center gap-x-2 mb-2 p-2',
                      isActive
                        ? ' bg-gray-200 rounded-md text-uneti-primary'
                        : ' hover:bg-gray-200 hover:rounded-md hover:text-uneti-primary',
                    ].join(' ')
                  }}
                >
                  <BsFilePost size={32} />
                  Bài đăng của tôi
                </NavLink>
              </li>
            </ul>
            {/* End: Danh mục */}
          </div>
        </aside>
        <main className={[bem.e('inner'), ' col-span-8']}>
          <FormBaiDangCSKN />
          <div className="my-4">
            <Outlet />
          </div>
        </main>
        <aside className={[bem.e('aside'), ' col-span-2']}>
          <div className="w-full  sticky top-32">
            <p className="text-center font-bold text-uneti-primary text-xl uppercase mb-4">
              Chuyên mục
            </p>
            <div className="flex flex-col gap-y-4">
              <Link
                to={
                  'https://uneti.edu.vn/giay-chung-nhan-kiem-dinh-chat-luong-co-so-giao-duc/'
                }
                target="_blank"
              >
                <div className=" rounded-full flex items-center">
                  <img
                    src="https://uneti.edu.vn/wp-content/uploads/2019/10/Asset-22.png"
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  />
                  <p className="text-center font-semibold text-uneti-primary">
                    Chứng nhận kiểm định
                  </p>
                </div>
              </Link>
              {/* End: chứng nhận kiểm định */}

              <Link
                to={'https://uneti.edu.vn/category/ba-cong-khai/'}
                target="_blank"
              >
                <div className=" rounded-full flex items-center">
                  <img
                    src="https://uneti.edu.vn/wp-content/uploads/2020/03/bao-cao-3-cong-khai-1-2.jpg"
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  />
                  <p className="text-center font-semibold text-uneti-primary">
                    Báo cáo 3 công khai
                  </p>
                </div>
              </Link>
              {/* Báo cáo 3 công khai */}
              <Link
                to={'https://uneti.edu.vn/category/tuyen-dung/'}
                target="_blank"
              >
                <div className=" rounded-full flex items-center">
                  <img
                    src="https://uneti.edu.vn/wp-content/uploads/2021/10/2edb787a3d75f42bad64.jpg"
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  />
                  <p className="text-center font-semibold text-uneti-primary">
                    Thông tin tuyển dụng
                  </p>
                </div>
              </Link>
              {/* End: Tuyển dụng */}
              <Link
                to={'https://uneti.edu.vn/category/ngay-hoi-viec-lam-2024/'}
                target="_blank"
              >
                <div className=" rounded-full flex items-center">
                  <img
                    src="https://uneti.edu.vn/wp-content/uploads/2023/04/Untitled-1.png"
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  />
                  <p className="text-center font-semibold text-uneti-primary">
                    Thông tin việc làm
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default ChiaSeVaKetNoiLayout
