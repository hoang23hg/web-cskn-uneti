import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { LuAlertTriangle, LuPlus, LuX } from 'react-icons/lu'
import { listTopicPostCSKN } from './constants'
import { useState } from 'react'
import clsx from 'clsx'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import noAvatar from '@/assets/Images/noavatar.png'
import { isEmpty } from 'lodash-unified'
import FormDangBaiTLHT from './BaiDangTLHT/FormDangBaiTLHT'
import Swal from 'sweetalert2'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import FormDangBanTLHT from './BaiDangTLHT/FormDangBanTLHT'
import FormChoThueTro from './BaiDangNhaO/FormChoThueTro'
import FormTimTro from './BaiDangNhaO/FormTimTro'
import FormTuyenDungViecLam from './BaiDangViecLam/FormTuyenDungViecLam'
import FormDangBaiDDCN from './BaiDangDoDungCaNhan/FormDangBaiDDCN'
import FormDangBanDDCN from './BaiDangDoDungCaNhan/FormDangBanDDCN'
import dayjs from 'dayjs'

import {
  post_DangBai_TaiLieuHocTap,
  post_DangBan_TaiLieuHocTap,
} from '@/Apis/ChiaSevaKetNoi/apiTaiLieuHocTap'
import { toast } from 'react-toastify'
import {
  post_DangBai_ChoThueTro,
  post_DangBai_TimTro,
} from '@/Apis/ChiaSevaKetNoi/apiPhongTro'
import {
  post_DangBai_DoDungCaNhan,
  post_DangBan_DoDungCaNhan,
} from '@/Apis/ChiaSevaKetNoi/apiDoDungCaNhan'
import { post_DangBai_ViecLam } from '@/Apis/ChiaSevaKetNoi/apiViecLam'

function FormBaiDangCSKN(props) {
  const { loading } = props
  const dataSV = DataSinhVien()
  const { formTyppe } = props
  const [openCreatePost, setOpenCreatePost] = useState(false)
  const [isTopic, setIsTopic] = useState('')
  const [isCategory, setIsCategory] = useState('')
  const [isActiveTopic, setIsActiveTopic] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [dataPost, setDataPost] = useState({})
  const [listImages, setListImages] = useState([])

  const handleSelectImage = async (e) => {
    const { files } = e.target

    if (files.length > 5) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng chỉ chọn tối đa 5 hình ảnh!',
      })
      setListImages([])
      return
    }
    Array.from(files).map(async (file) => {
      const imageBase64 = await convertDataFileToBase64(file)
      const urlTemp = URL.createObjectURL(file)
      setListImages((prevImage) => {
        return [
          ...prevImage,
          {
            urlTemp: urlTemp,
            lastModified: file.lastModified ?? '',
            dataFile: imageBase64,
            fileName:
              file.name ??
              `${dayjs(new Date()).format('DD/MM/YYYY_HH_mm_ss')}.jpg`,
          },
        ]
      })
    })
  }

  const handleDeleteImage = async (fileImage) => {
    const newListImages = listImages.filter((image) => image !== fileImage)
    setListImages(newListImages)
  }

  const handleCloseCreatePost = () => {
    Swal.fire({
      icon: 'question',
      title: 'Bạn chắc chắn muốn tắt đăng bài?',
      text: 'Sau khi đóng, tất cả các thông tin bài viết bạn nhập sẽ không được lưu lại.',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenCreatePost(false)
        setIsTopic('')
        setIsCategory('')
        setIsActiveTopic(null)
        setListImages([])
      }
    })
  }

  const handleChangeValue = (e) => {
    const { id, name, value } = e.target
    if (name === 'Dang_Bai_TaiLieuHocTap_TheLoai') {
      setDataPost({ ...dataPost, [name]: value })
    }
    setDataPost({ ...dataPost, [id]: value })
  }

  const handleSubmitPost = async () => {
    let uploadDataPost = { ...dataPost }
    // Data post Tài liệu học tập
    if (isCategory === 'TLHT_DangBai') {
      uploadDataPost.Dang_Bai_TaiLieuHocTap_IDNguoiDung = dataSV.IdSinhVien
      uploadDataPost.Dang_Bai_TaiLieuHocTap_LoaiNguoiDung = '1'
      uploadDataPost.Dang_Bai_TaiLieuHocTap_NgayDang = dayjs().format(
        'YYYY-MM-DD HH:mm:ss',
      )
      uploadDataPost.Dang_Bai_TaiLieuHocTap_Show = '1'
      uploadDataPost.Dang_Bai_TaiLieuHocTap_Check = '1'
      uploadDataPost.Dang_Bai_TaiLieuHocTap_BaoCao = '1'
      uploadDataPost.Dang_Bai_TaiLieuHocTap_Luu = '0'
      uploadDataPost.Dang_Bai_TaiLieuHocTap_YeuThich = '0'
      uploadDataPost.Dang_Bai_TaiLieuHocTap_BinhLuan = ''
      uploadDataPost.Dang_Bai_TaiLieuHocTap_NguonTiepNhan = '1'
      uploadDataPost.images =
        listImages.length > 0
          ? listImages.map((i) => {
              return {
                urlTemp: i.urlTemp,
                lastModified: i.lastModified,
                Dang_Bai_TaiLieuHocTap_DataFile: i.dataFile,
                Dang_Bai_TaiLieuHocTap_TenFile: i.fileName,
              }
            })
          : []
      // END: update data post

      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn đăng bài về tài liệu học tập này?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await post_DangBai_TaiLieuHocTap(uploadDataPost)
          if (res.status === 200) {
            toast.success('Đăng bài thành công!')
          }
        }
      })

      return
    }

    if (isCategory === 'TLHT_DangSanPham') {
      uploadDataPost.Dang_SP_TaiLieuHocTap_IDNguoiDung = dataSV.IdSinhVien
      uploadDataPost.Dang_SP_TaiLieuHocTap_LoaiNguoiDang = '1'
      uploadDataPost.Dang_SP_TaiLieuHocTap_NgayDang = dayjs(new Date()).format(
        'YYYY-MM-DDTHH:mm:ss',
      )
      uploadDataPost.Dang_SP_TaiLieuHocTap_Show = '1'
      uploadDataPost.Dang_SP_TaiLieuHocTap_Check = '1'
      uploadDataPost.Dang_SP_TaiLieuHocTap_BaoCao = '1'
      uploadDataPost.Dang_SP_TaiLieuHocTap_Luu = '0'
      uploadDataPost.Dang_SP_TaiLieuHocTap_YeuThich = '0'
      uploadDataPost.Dang_SP_TaiLieuHocTap_BinhLuan = ''
      uploadDataPost.Dang_SP_TaiLieuHocTap_NguonTiepNhan = '1'
      uploadDataPost.Dang_SP_TaiLieuHocTap_Anh = ''
      uploadDataPost.images =
        listImages.length > 0
          ? listImages.map((i) => {
              return {
                urlTemp: i.urlTemp,
                lastModified: i.lastModified,
                Dang_SP_TaiLieuHocTap_DataFile: i.dataFile,
                Dang_SP_TaiLieuHocTap_TenFile: i.fileName,
              }
            })
          : []
      // END: update data post
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn đăng bán về tài liệu học tập này?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await post_DangBan_TaiLieuHocTap(uploadDataPost)
          if (res.status === 200) {
            toast.success('Đăng bán thành công tài liệu học tập!')
          }
        }
      })

      return
    }
    // Data post Nhà ở
    if (isCategory === 'NHAO_DangBaiChoThue') {
      uploadDataPost.Dang_Bai_Cho_Thue_IDNguoiDung = dataSV.IdSinhVien
      uploadDataPost.Dang_Bai_Cho_Thue_LoaiNguoiDang = '1'
      uploadDataPost.Dang_Bai_Cho_Thue_NgayDang = dayjs(new Date()).format(
        'YYYY-MM-DDTHH:mm:ss',
      )
      uploadDataPost.Dang_Bai_Cho_Thue_Show = '1'
      uploadDataPost.Dang_Bai_Cho_Thue_Check = '1'
      uploadDataPost.Dang_Bai_Cho_Thue_BaoCao = '1'
      uploadDataPost.Dang_Bai_Cho_Thue_Luu = '0'
      uploadDataPost.Dang_Bai_Cho_Thue_YeuThich = '0'
      uploadDataPost.Dang_Bai_Cho_Thue_BinhLuan = ''
      uploadDataPost.Dang_Bai_Cho_Thue_NguonTiepNhan = '1'
      uploadDataPost.Dang_Bai_Cho_Thue_TepDinhKem = ''
      uploadDataPost.images =
        listImages.length > 0
          ? listImages.map((i) => {
              return {
                urlTemp: i.urlTemp,
                lastModified: i.lastModified,
                Dang_Bai_Cho_Thue_DataFile: i.dataFile,
                Dang_Bai_Cho_Thue_TenFile: i.fileName,
              }
            })
          : []
      // END: update data post
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn đăng bài cho thuê nhà ở/phòng trọ này?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await post_DangBai_ChoThueTro(uploadDataPost)
          if (res.status === 200) {
            toast.success('Đăng bài thành công về cho thuê nhà ở/phòng trọ!')
          }
        }
      })

      return
    }
    if (isCategory === 'NHAO_DangBaiTimTro') {
      uploadDataPost.Dang_Bai_Tim_Tro_IDNguoiDung = dataSV.IdSinhVien
      uploadDataPost.Dang_Bai_Tim_Tro_LoaiNguoiDang = '1'
      uploadDataPost.Dang_Bai_Tim_Tro_NgayDang = dayjs(new Date()).format(
        'YYYY-MM-DDTHH:mm:ss',
      )
      uploadDataPost.Dang_Bai_Tim_Tro_Show = '1'
      uploadDataPost.Dang_Bai_Tim_Tro_Check = '1'
      uploadDataPost.Dang_Bai_Tim_Tro_BaoCao = '1'
      uploadDataPost.Dang_Bai_Tim_Tro_Luu = '0'
      uploadDataPost.Dang_Bai_Tim_Tro_YeuThich = '0'
      uploadDataPost.Dang_Bai_Tim_Tro_BinhLuan = ''
      uploadDataPost.Dang_Bai_Tim_Tro_NguonTiepNhan = '1'
      uploadDataPost.images =
        listImages.length > 0
          ? listImages.map((i) => {
              return {
                urlTemp: i.urlTemp,
                lastModified: i.lastModified,
                Dang_Bai_Tim_Tro_DataFile: i.dataFile,
                Dang_Bai_Tim_Tro_TenFile: i.fileName,
              }
            })
          : []
      // END: update data post
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn đăng bài cho tìm trọ này?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await post_DangBai_TimTro(uploadDataPost)
          if (res.status === 200) {
            toast.success('Đăng bài thành công về tìm trọ!')
          }
        }
      })

      return
    }
    // Data post Việc làm
    if (isCategory === 'VIECLAM_DangBaiTuyenDung') {
      uploadDataPost.Dang_Bai_ViecLam_IDNguoiDung = dataSV.IdSinhVien
      uploadDataPost.Dang_Bai_ViecLam_LoaiNguoiDang = '1'
      uploadDataPost.Dang_Bai_ViecLam_NgayDang = dayjs(new Date()).format(
        'YYYY-MM-DDTHH:mm:ss',
      )
      uploadDataPost.Dang_Bai_ViecLam_Show = '1'
      uploadDataPost.Dang_Bai_ViecLam_Check = '1'
      uploadDataPost.Dang_Bai_ViecLam_BaoCao = '1'
      uploadDataPost.Dang_Bai_ViecLam_Luu = '0'
      uploadDataPost.Dang_Bai_ViecLam_YeuThich = '0'
      uploadDataPost.Dang_Bai_ViecLam_BinhLuan = ''
      uploadDataPost.Dang_Bai_ViecLam_NguonTiepNhan = '1'
      uploadDataPost.Dang_Bai_ViecLam_TenFile = '1'
      uploadDataPost.Dang_Bai_ViecLam_Anh = '1'
      uploadDataPost.images =
        listImages.length > 0
          ? listImages.map((i) => {
              return {
                urlTemp: i.urlTemp,
                lastModified: i.lastModified,
                Dang_Bai_ViecLam_DataFile: i.dataFile,
                Dang_Bai_ViecLam_TenFile: i.fileName,
              }
            })
          : []
      // END: update data post
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn đăng bài cho tuyển dụng việc làm?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await post_DangBai_ViecLam(uploadDataPost)
          if (res.status === 200) {
            toast.success('Đăng bài thành công về tuyển dụng việc làm!')
          }
        }
      })

      return
    }
    // Data post Đồ dùng cá nhân
    if (isCategory === 'DDCN_DangBai') {
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_IDNguoiDung = dataSV.IdSinhVien
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_LoaiNguoiDang = '1'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_NgayDang = dayjs(
        new Date(),
      ).format('YYYY-MM-DDTHH:mm:ss')
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_Show = '1'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_Check = '1'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_BaoCao = '1'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_Luu = '0'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_YeuThich = '0'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_BinhLuan = ''
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_NguonTiepNhan = '1'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_TenFile = '1'
      uploadDataPost.Dang_Bai_SP_DoDungCaNhan_Anh = '1'
      uploadDataPost.images =
        listImages.length > 0
          ? listImages.map((i) => {
              return {
                urlTemp: i.urlTemp,
                lastModified: i.lastModified,
                Dang_Bai_SP_DoDungCaNhan_DataFile: i.dataFile,
                Dang_Bai_SP_DoDungCaNhan_TenFile: i.fileName,
              }
            })
          : []
      // END: update data post
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn đăng bài về đồ dùng cá nhân?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await post_DangBai_DoDungCaNhan(uploadDataPost)
          if (res.status === 200) {
            toast.success('Đăng bài thành công về đồ dùng cá nhân!')
          }
        }
      })

      return
    }
    if (isCategory === 'DDCN_DangSanPham') {
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_IDNguoiDung = dataSV.IdSinhVien
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_LoaiNguoiDang = '1'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_NgayDang = dayjs(
        new Date(),
      ).format('YYYY-MM-DDTHH:mm:ss')
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_Show = '1'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_Check = '1'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_BaoCao = '1'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_Luu = '0'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_YeuThich = '0'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_BinhLuan = ''
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_NguonTiepNhan = '1'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_TenFile = '1'
      uploadDataPost.Dang_Ban_SP_DoDungCaNhan_Anh = '1'
      uploadDataPost.images =
        listImages.length > 0
          ? listImages.map((i) => {
              return {
                urlTemp: i.urlTemp,
                lastModified: i.lastModified,
                Dang_Ban_SP_DoDungCaNhan_DataFile: i.dataFile,
                Dang_Ban_SP_DoDungCaNhan_TenFile: i.fileName,
              }
            })
          : []
      // END: update data post
      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn đăng bán về đồ dùng cá nhân?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await post_DangBan_DoDungCaNhan(uploadDataPost)
          if (res.status === 200) {
            toast.success('Đăng bán thành công về đồ dùng cá nhân!')
          }
        }
      })

      return
    }
  }

  return (
    <div>
      {/* Open Create Post */}
      <div
        className={clsx(
          'bg-white rounded-md p-2 shadow-md flex items-center gap-4 mb-4',
          openCreatePost && 'hidden',
        )}
      >
        <img
          src={dataSV.HinhAnh ?? noAvatar}
          alt=""
          className={'w-10 h-10 rounded-full object-cover'}
        />
        <p
          onClick={() => {
            setOpenCreatePost(true)
          }}
          className="cursor-pointer w-full p-2 bg-slate-200 text-gray-400 rounded-full"
        >
          Bạn đang muốn đăng nội dung gì?
        </p>
      </div>
      {/* Create Post */}
      <div
        className={clsx(
          'bg-white shadow-md rounded-md',
          !openCreatePost && 'hidden',
        )}
      >
        {/* Start: Header Post */}
        <div className="header h-14 relative flex items-center justify-center border-b p-2">
          <h3 className="font-bold text-xl text-black">Tạo bài viết mới</h3>
          <div
            onClick={handleCloseCreatePost}
            className="absolute right-14 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300"
          >
            <LuX size={26} />
          </div>
        </div>
        {/* End: Header Post */}

        {/* Start: Body Post */}
        <div className="body py-2 px-4 flex flex-col gap-y-6">
          <div className="body-topic--post">
            <h3 className="mb-2 font-bold">Chủ đề bài đăng (*)</h3>
            <div className="grid grid-cols-4 gap-2">
              {listTopicPostCSKN.map((tp, index) => {
                const handleActiveTopic = (index) => {
                  setIsTopic(tp.value)
                  setIsActiveTopic(index)
                  setSelectedCategory(null)
                  setIsCategory('')
                }
                return (
                  <div
                    onClick={() => {
                      handleActiveTopic(index)
                    }}
                    key={tp.id}
                    className="col-span-2 lg:col-span-1"
                  >
                    <div
                      className={clsx(
                        'px-3 py-2 border border-uneti-primary-lighter/70 shadow-md rounded-md cursor-pointer flex items-center justify-center',
                        isActiveTopic === index
                          ? ' bg-uneti-primary-lighter text-white'
                          : 'hover:bg-uneti-primary-lighter/80 hover:text-white',
                      )}
                    >
                      <p className="text-center font-semibold">{tp.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {/* END: .body-topic--post */}

          <div
            className={clsx(
              'body-category--post',
              isEmpty(isTopic) && 'hidden',
            )}
          >
            <h3 className="mb-2 font-bold">Thể loại bài đăng (*)</h3>
            <div className="grid grid-cols-2 gap-2">
              {listTopicPostCSKN.map((tp) => {
                if (tp.value === isTopic) {
                  return tp.categories.map((ct, index) => {
                    const handleChooseCategory = (index) => {
                      setSelectedCategory(index)
                      setIsCategory(ct.value)
                    }
                    return (
                      <div
                        onClick={() => {
                          handleChooseCategory(index)
                        }}
                        key={ct.id}
                        className="col-span-2 lg:col-span-1"
                      >
                        <div
                          className={clsx(
                            'px-3 py-2 border border-uneti-primary-lighter/70 shadow-md rounded-md cursor-pointer flex items-center justify-center',
                            selectedCategory === index &&
                              ' bg-uneti-primary-lighter text-white',
                          )}
                        >
                          <p className="text-center font-semibold">
                            {ct.label}
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              })}
            </div>
          </div>
          {/* END: .body-category--post */}

          {/* FORM */}
          {/* FORM 1: Đăng bài TLHT */}
          {isCategory === 'TLHT_DangBai' && (
            <FormDangBaiTLHT onChangeValue={handleChangeValue} />
          )}
          {/* FORM 2: Đăng bán sản phẩm TLHT */}
          {isCategory === 'TLHT_DangSanPham' && (
            <FormDangBanTLHT onChangeValue={handleChangeValue} />
          )}
          {/* FORM 3: Đăng cho thuê trọ */}
          {isCategory === 'NHAO_DangBaiChoThue' && (
            <FormChoThueTro onChangeValue={handleChangeValue} />
          )}
          {/* FORM 4: Đăng tìm trọ */}
          {isCategory === 'NHAO_DangBaiTimTro' && (
            <FormTimTro onChangeValue={handleChangeValue} />
          )}
          {/* FORM 5: Đăng tuyển dụng việc làm */}
          {isCategory === 'VIECLAM_DangBaiTuyenDung' && (
            <FormTuyenDungViecLam onChangeValue={handleChangeValue} />
          )}
          {/* FORM 6: Đăng bài Đồ dùng cá nhân */}
          {isCategory === 'DDCN_DangBai' && (
            <FormDangBaiDDCN onChangeValue={handleChangeValue} />
          )}
          {/* FORM 7: Đăng bán Đồ dùng cá nhân */}
          {isCategory === 'DDCN_DangSanPham' && (
            <FormDangBanDDCN onChangeValue={handleChangeValue} />
          )}
          {/* FORM */}

          <div className="body-image--post">
            <h3 className="font-bold">Thêm hình ảnh vào bài viết</h3>
            <small className="text-red-600">
              (Tối đa 5 hình ảnh dạng JPG | JPEG | PNG & Kích thước tối đa 5MB)
            </small>
            <div className="image--list my-2 flex flex-wrap items-center gap-2">
              <label
                htmlFor="select-image"
                className={clsx(
                  'w-40 h-40 rounded-md border border-dashed border-uneti-primary-lighter/70 flex items-center justify-center cursor-pointer hover:bg-slate-200 hover:text-uneti-primary-lighter',
                  listImages.length >= 5 && 'hidden',
                )}
              >
                <LuPlus size={50} />
              </label>
              <input
                type="file"
                id="select-image"
                className="hidden"
                multiple={true}
                onChange={(e) => {
                  handleSelectImage(e)
                }}
              />
              {listImages.length > 0 &&
                listImages?.map((img, index) => {
                  return (
                    <div key={index} className="relative">
                      <img
                        src={img?.imageBase64 ?? img?.urlTemp}
                        className="w-40 h-40 rounded-md object-cover"
                      />
                      <div
                        onClick={() => {
                          handleDeleteImage(img)
                        }}
                        className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-slate-100 text-gray-900 flex items-center justify-center cursor-pointer hover:bg-slate-200 hover:text-red-600"
                      >
                        <LuX />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          {/* END: .body-image--post */}

          <p className="flex items-center gap-x-2 font-semibold text-red-600">
            <LuAlertTriangle />
            Chú ý đọc kỹ văn bản pháp lý trước khi đăng bài
          </p>
          {/* END: Note */}
          <div className="body-action--post flex items-center justify-center mb-2">
            <button
              onClick={handleSubmitPost}
              className="px-10 py-2 rounded-full bg-white text-uneti-primary-lighter font-semibold border border-uneti-primary-lighter hover:text-white hover:bg-uneti-primary-lighter"
            >
              Đăng bài
            </button>
          </div>
          {/* END: .body-image--post */}
        </div>
        {/* End: Body Post */}
      </div>
    </div>
  )
}

FormBaiDangCSKN.propTypes = {}

export default FormBaiDangCSKN
