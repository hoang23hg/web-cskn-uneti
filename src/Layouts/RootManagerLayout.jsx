import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LuChevronDown } from 'react-icons/lu'

const RootManagerLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-x-4">
      <aside className="col-span-2 bg-white min-h-screen rounded-lg shadow-md">
        <h2 className="px-4 py-2 text-uneti-primary font-bold text-center rounded-t-lg border-b border-uneti-primary">
          Trường Đại học Kinh Tế - Kỹ Thuật Công Nghiệp
        </h2>
        <div className="">
          {/* START: Manager */}
          <div className="">
            <div className="text-uneti-primary px-4 py-2 hover:bg-uneti-primary hover:text-white font-medium flex items-center justify-between cursor-pointer">
              <h3 className="">Quản trị module chung</h3>
              <LuChevronDown size={24} className={'-rotate-90'} />
            </div>
          </div>
          {/* END: Manager */}

          {/* START: Sinh Viên Manager */}
          <div className="">
            <div className="text-uneti-primary px-4 py-2 hover:bg-uneti-primary hover:text-white font-medium flex items-center justify-between cursor-pointer">
              <h3 className="">Quản trị module Sinh Viên</h3>
              <LuChevronDown size={24} className={'-rotate-90'} />
            </div>
            <ul className="bg-uneti-primary/10 pl-4">
              <li>
                <NavLink to={'quan-tri-module-sinh-vien/mot-cua'}>
                  <p className="p-2 cursor-pointer font-medium hover:bg-uneti-primary/50 hover:text-white">
                    Module Một Cửa
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to={'quan-tri-module-sinh-vien/hoc-tap'}>
                  <p className="p-2 cursor-pointer font-medium hover:bg-uneti-primary/50 hover:text-white">
                    Module Học Tập
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to={'quan-tri-module-sinh-vien/tra-cuu'}>
                  <p className="p-2 cursor-pointer font-medium hover:bg-uneti-primary/50 hover:text-white">
                    Module Tra Cứu
                  </p>
                </NavLink>
              </li>
              <li>
                <div className="text-uneti-primary p-2 hover:bg-uneti-primary hover:text-white font-medium flex items-center justify-between cursor-pointer">
                  <h3 className="">Module Chia Sẻ Và Kết Nối</h3>
                  <LuChevronDown size={24} className={'-rotate-90'} />
                </div>
                <ul className="pl-6">
                  <li>
                    <NavLink
                      to={'quan-tri-module-sinh-vien/chia-se-va-ket-noi'}
                    >
                      <p className="p-2 cursor-pointer font-medium hover:bg-uneti-primary/20 hover:text-white flex items-center justify-between">
                        Tổng quan
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={
                        'quan-tri-module-sinh-vien/chia-se-va-ket-noi/tai-lieu-hoc-tap'
                      }
                    >
                      <p className="p-2 cursor-pointer font-medium hover:bg-uneti-primary/20 hover:text-white flex items-center justify-between">
                        Phê duyệt bài viết
                        <span className="block w-6 h-6 rounded-full bg-red-600 text-white text-xs text-center py-1">
                          99+
                        </span>
                      </p>
                      <ul className="pl-6">
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/tai-lieu-hoc-tap'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Tài liệu học tập
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              14
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/nha-o'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Nhà ở
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              67
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/viec-lam'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Việc làm
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              88
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/do-dung-ca-nhan'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Đồ dùng cá nhân
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              49
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'quan-tri-module-sinh-vien/chia-se-va-ket-noi/nha-o'}
                    >
                      <p className="p-2 cursor-pointer font-medium hover:bg-uneti-primary/20 hover:text-white flex items-center justify-between">
                        Xử lý báo cáo
                        <span className="block w-6 h-6 rounded-full bg-red-600 text-white text-xs text-center py-1">
                          24
                        </span>
                      </p>
                      <ul className="pl-6">
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/tai-lieu-hoc-tap'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Tài liệu học tập
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              14
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/nha-o'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Nhà ở
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              67
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/viec-lam'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Việc làm
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              88
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={
                              'quan-tri-module-sinh-vien/chia-se-va-ket-noi/do-dung-ca-nhan'
                            }
                            className={({ isActive }) => {
                              return [
                                'p-2 cursor-pointer font-medium hover:bg-uneti-primary hover:text-white flex items-center justify-between',
                                isActive && 'bg-uneti-primary text-white',
                              ].join(' ')
                            }}
                          >
                            Đồ dùng cá nhân
                            <span className="block w-6 h-6 rounded-full bg-red-400 text-white text-xs text-center py-1">
                              49
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* END: Sinh Viên Manager */}

          {/* START: Giảng Viên Manager */}
          <div className="">
            <div className="text-uneti-primary px-4 py-2 hover:bg-uneti-primary hover:text-white font-medium flex items-center justify-between cursor-pointer">
              <h3 className="">Quản trị module Giảng Viên</h3>
              <LuChevronDown size={24} className={'-rotate-90'} />
            </div>
          </div>
          {/* END: Giảng Viên Manager */}
        </div>
      </aside>
      <main className="col-span-10">
        <Outlet />
      </main>
    </div>
  )
}

export default RootManagerLayout
