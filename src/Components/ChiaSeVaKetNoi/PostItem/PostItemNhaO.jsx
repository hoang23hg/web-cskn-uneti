import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { calculateTimeDifference } from '@/Services/Utils/dateTimeUtils'
import { useNamespace } from '@/Services/Hooks'
import clsx from 'clsx'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import noAvatar from '@/assets/Images/noavatar.png'
import noImage from '@/assets/Images/no-image.jpg'
import { LuHeart, LuMessagesSquare, LuMoreVertical, LuX, LuSendHorizonal } from 'react-icons/lu'
import { FcRules } from 'react-icons/fc'
import { CiLocationOn } from 'react-icons/ci'
import { FaArrowsSpin } from 'react-icons/fa6'
import { IoPricetagsSharp } from 'react-icons/io5'
import {
  MdAnnouncement,
  MdBookmark,
  MdConnectWithoutContact,
  MdElectricBolt,
} from 'react-icons/md'
import { BsFillHouseGearFill } from 'react-icons/bs'
import { RiContactsFill } from 'react-icons/ri'
import { AiOutlineAreaChart } from 'react-icons/ai'
import {
  get_ListPhanHoiGoc,
  post_PhanHoi,
} from '@/Apis/ChiaSevaKetNoi/apiBinhLuan'
import { FaHeart } from 'react-icons/fa6'
import { put_DangBai_PhongTro_YeuThich } from '@/Apis/ChiaSevaKetNoi/apiPhongTro'
import Swal from 'sweetalert2'
import { DebounceInput } from 'react-debounce-input'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { post_BaoCao_BaiDang } from '@/Apis/ChiaSevaKetNoi/apiBaoCao'
import { useEffect } from 'react'

function PostItemNhaO(props) {
  const bem = useNamespace('nha-o')
  const { dataPost } = props
  const dataSV = DataSinhVien()
  const [isComment, setIsComment] = useState(false)
  const [showMoreActionPost, setShowMoreActionPost] = useState(false)
  const showMoreActionRef = useRef()
  const [listComment, setListComment] = useState([])
  const [comment, setComment] = useState('')
  const [tym, setTym] = useState(false)
  const [typePost, setTypePost] = useState('')
  const inputRef = useRef()
  const [saved, setSaved] = useState(false)
  const [report, setReport] = useState(false)
  const [likeCount, setLikeCount] = useState(dataPost.Dang_Bai_Cho_Thue_YeuThich ?? dataPost.Dang_Bai_Tim_Tro_YeuThich)

  const handleShowMoreActionPost = () => {
    setShowMoreActionPost(!showMoreActionPost)
  }

  // fetch data
  const handleSubmitComment = async () => {
    const dataComment = {
      Dang_PhanHoi_IDPhanHoiCha: null,
      Dang_PhanHoi_IDBaiDang:
        dataPost.Dang_Bai_Cho_Thue_IDBaiDang ??
        dataPost.Dang_Bai_Tim_Tro_IDBaiDang,
      Dang_PhanHoi_TenBang: typePost,
      Dang_PhanHoi_IDNguoiXem: '1',
      Dang_PhanHoi_LoaiNguoiXem: '1',
      Dang_PhanHoi_IDNguoiDang: dataSV.IdSinhVien,
      Dang_PhanHoi_LoaiNguoiDang: '0',
      Dang_PhanHoi_BinhLuanNguoiDang: comment,
      Dang_PhanHoi_CamXucNguoiXem: '0',
      Dang_PhanHoi_NguonTiepNhan: '1',
    }
    const res = await post_PhanHoi(dataComment)
    if (res.status !== 200) {
      Swal.fire({
        icon: 'error',
        title: 'Đã có lỗi xảy ra!',
        text: 'Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại sau.',
    });
    } else {
      setListComment([
        ...listComment,
        { ...dataComment, HoTen: dataSV.HoDem + ' ' + dataSV.Ten },
      ])
      setComment('')
    }
  }
  // tim bài viết
  const handleLike = async () => {
    let yeuthich = tym ? -1 : 1
    const dataTym = {
      Dang_Bai_Cho_Thue_YeuThich: '1',
      Dang_Bai_Tim_Tro_YeuThich: '1',
    }
    await put_DangBai_PhongTro_YeuThich(dataTym)
    if (dataPost.Dang_Bai_Cho_Thue_YeuThich)
      dataPost.Dang_Bai_Cho_Thue_YeuThich =
        dataPost.Dang_Bai_Cho_Thue_YeuThich
          ? dataPost.Dang_Bai_Cho_Thue_YeuThich + yeuthich
          : 0 + yeuthich
    else
      dataPost.Dang_Bai_Tim_Tro_YeuThich=
        dataPost.Dang_Bai_Tim_Tro_YeuThich
          ? dataPost.Dang_Bai_Tim_Tro_YeuThich + yeuthich
          : 0 + yeuthich
    setTym(!tym)
    setLikeCount(likeCount + yeuthich)
  }

  const handleShowComment = async (type) => {
    setIsComment(true)
    const idBaiDang =
      dataPost.Dang_Bai_Cho_Thue_IDBaiDang ??
      dataPost.Dang_Bai_Tim_Tro_IDBaiDang
    const res = await get_ListPhanHoiGoc(idBaiDang, type)
    if (res.status === 200) {
      const data = await res.data.body
      setListComment(data)
    }
  }
 //Tạo hàm báo cáo bài đăng
 const handleBaoCaoBaiViet = async () => {
  const { value: reportContent } = await Swal.fire({
    title: 'Báo cáo bài viết',
    input: 'textarea',
    inputLabel: 'Nội dung báo cáo',
    inputPlaceholder: 'Nhập nội dung báo cáo...',
    inputAttributes: {
      'aria-label': 'Nhập nội dung báo cáo',
    },
    showCancelButton: true,
    confirmButtonText: 'Gửi',
    cancelButtonText: 'Hủy',
  })

  if (reportContent) {
    const dataReport = {
      Dang_BaoCao_IDNguoiDung: dataSV.IdSinhVien,
      Dang_BaoCao_LoaiNguoiDung: '1',
      Dang_BaoCao_TenBang: typePost,
      Dang_BaoCao_IDBaiViet: dataPost.Dang_Bai_Tim_Tro_IDBaiDang ?? dataPost.Dang_Bai_Cho_Thue_IDBaiDang,
      Dang_BaoCao_NoiDung: reportContent,
      Dang_BaoCao_NguonTiepNhan: '1',
    }
    const res = await post_BaoCao_BaiDang(dataReport)
    if (res.status == 200) {
      setReport(true)
      Swal.fire({
        title: 'Thành công!',
        text: 'Bài viết đã được báo cáo.',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    } else {
      console.error("Lỗi khi báo cáo bài viết: ")
      Swal.fire({
        title: 'Lỗi!',
        text: 'Đã có lỗi xảy ra khi báo cáo bài viết. Vui lòng thử lại sau.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }
}
useEffect(() => {
  if (dataPost.Dang_Bai_Cho_Thue_IDBaiDang) {
    setTypePost('Dang_Bai_Cho_Thue')
  } else {
    setTypePost('Dang_Bai_Tim_Tro')
  }
}, [])


  const handleHideComment = () => {
    setIsComment(false)
  }



  return (
      <div className={[bem.e('post__item')]}>
        <div
          className={clsx('bg-white rounded-md border border-gray-200 shadow-md')}
        >
          <div className='grip grip-cols-12'>
            <div className={[bem.em('post-item', 'content'), ` col-span-12`]}>
            <div className="flex flex-col gap-y-2 p-2">
            {/* Start: Loại bài viết */}
            
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold border border-uneti-primary-lighter text-uneti-primary-lighter px-2 py-1 rounded-md w-32 text-center my-2">
                  Bài viết{' '}
                  <strong>
                    {dataPost.Dang_Bai_Tim_Tro_Gia ? 'Tìm trọ' : 'Cho thuê'}
                  </strong>
                </h3>
                {isComment && (
                  <div
                    onClick={handleHideComment}
                    className="w-10 h-10 p-2 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    <LuX size={24} />
                  </div>
                )}
              </div>


            {/* Start: info user */}
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <div className="w-10 h-10 rounded-full border border-gray-200">
                  <img
                    src={dataPost.Anh ?? noAvatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="">
                  <h3 className="font-semibold">{dataPost.HoTen}</h3>
                  <p className="text-xs font-medium text-gray-400">
                    {dataPost.Dang_Bai_Cho_Thue_NgayDang
                      ? calculateTimeDifference(
                          dataPost.Dang_Bai_Cho_Thue_NgayDang,
                        )
                      : calculateTimeDifference(
                          dataPost.Dang_Bai_Tim_Tro_NgayDang,
                        )}
                  </p>
                </div>
              </div>
              {/* Action */}
              <div className="relative">
                <LuMoreVertical
                  onClick={handleShowMoreActionPost}
                  size={16}
                  className="w-8 h-8 p-2 cursor-pointer rounded-full hover:bg-slate-100"
                />
                <div
                  ref={showMoreActionRef}
                  className={clsx(
                    'absolute -left-[160px] w-[180px] rounded-md shadow-md',
                    showMoreActionPost ? '' : 'hidden',
                  )}
                >
                  <ul className="w-[180px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md flex flex-col">
                    <li>
                      <p className=" rounded-t-md flex items-center gap-x-1 p-2 hover:bg-gray-200 hover:text-uneti-primary-lighter cursor-pointer">
                        <MdBookmark size={24} />
                        Lưu bài viết
                      </p>
                    </li>
                    <li>
                      <p className=" rounded-b-md flex items-center gap-x-1 p-2 hover:bg-gray-200 hover:text-uneti-primary-lighter cursor-pointer">
                        <MdAnnouncement size={24} />
                        <button onClick={handleBaoCaoBaiViet}>
                            {report ? "Đã báo cáo" : "Báo cáo bài viết"}
                        </button>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End: info user */}

            {/* Start: Nội dung */}
            <div className="w-full">
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-6">
                  <div className="w-full flex items-center flex-wrap">
                    <p className="font-semibold flex items-center">
                      <CiLocationOn
                        className="text-uneti-primary mr-2"
                        size={18}
                      />
                      Vị trí:
                    </p>
                    <div className="pl-4">
                      <p className="whitespace-pre-wrap">
                        {dataPost.Dang_Bai_Cho_Thue_ViTri ??
                          dataPost.Dang_Bai_Tim_Tro_ViTri}
                      </p>
                    </div>
                  </div>
                </div>
                {/* End: Vị trí */}
                {dataPost.Dang_Bai_Cho_Thue_TinhTrang && (
                  <div className="col-span-3">
                    <div className="w-full flex items-center flex-wrap">
                      <p className="font-semibold flex items-center">
                        <FaArrowsSpin
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Tình trạng:
                      </p>
                      <div className="pl-4">
                        <p className="whitespace-pre-wrap">
                          {dataPost.Dang_Bai_Cho_Thue_TinhTrang}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End: Tình trạng */}
                {dataPost.Dang_Bai_Cho_Thue_DienTich && (
                  <div className="col-span-3">
                    <div className="w-full flex items-center flex-wrap">
                      <p className="font-semibold flex items-center">
                        <AiOutlineAreaChart
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Diện tích:
                      </p>
                      <div className="pl-4">
                        <p className="whitespace-pre-wrap">
                          {dataPost.Dang_Bai_Cho_Thue_DienTich} m<sup>2</sup>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End: Diện tích */}
                <div className="col-span-3">
                  <div className="w-full flex items-center gap-x-2">
                    <p className="font-semibold flex items-center">
                      <IoPricetagsSharp
                        className="text-uneti-primary mr-2"
                        size={18}
                      />
                      Giá:
                    </p>
                    <p className="whitespace-pre-wrap">
                      {dataPost.Dang_Bai_Cho_Thue_Gia?.toLocaleString() ??
                        dataPost.Dang_Bai_Tim_Tro_Gia?.toLocaleString()}
                      <sup>đ</sup>
                    </p>
                  </div>
                </div>
                {/* End: Giá */}
                {dataPost.Dang_Bai_Cho_Thue_DienNuoc && (
                  <div className="col-span-3">
                    <div className="w-full flex items-center flex-wrap">
                      <p className="font-semibold flex items-center">
                        <MdElectricBolt
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Điện nước:
                      </p>
                      <div className="pl-4">
                        <p className="whitespace-pre-wrap">
                          {dataPost.Dang_Bai_Cho_Thue_DienNuoc?.toLocaleString()}
                          <sup>đ</sup>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End: Điện nước */}
                {dataPost.Dang_Bai_Cho_Thue_NoiThatAnNinh && (
                  <div className="col-span-3">
                    <div className="w-full flex items-center flex-wrap">
                      <p className="font-semibold flex items-center">
                        <BsFillHouseGearFill
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Nội thất:
                      </p>
                      <div className="pl-4">
                        <p className="whitespace-pre-wrap">
                          {dataPost.Dang_Bai_Cho_Thue_NoiThatAnNinh}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End: Nội thất */}
                <div className="col-span-3">
                  <div className="w-full flex items-center flex-wrap">
                    <p className="font-semibold flex items-center">
                      <MdConnectWithoutContact
                        className="text-uneti-primary mr-2"
                        size={18}
                      />
                      Liên hệ:
                    </p>
                    <div className="pl-4">
                      <p className="whitespace-pre-wrap">
                        {dataPost.Dang_Bai_Cho_Thue_LienHe}
                      </p>
                    </div>
                  </div>
                </div>
                {/* End: Liên hệ */}
                {dataPost.Dang_Bai_Cho_Thue_DoiTuong && (
                  <div className="col-span-3">
                    <div className="w-full flex items-center flex-wrap">
                      <p className="font-semibold flex items-center">
                        <RiContactsFill
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Đối tượng:
                      </p>
                      <div className="pl-4">
                        <p className="whitespace-pre-wrap">
                          {dataPost.Dang_Bai_Cho_Thue_DoiTuong}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End: Đối tượng */}
                {dataPost.Dang_Bai_Cho_Thue_NoiQuy && (
                  <div className="col-span-6">
                    <div className="w-full flex flex-col flex-wrap">
                      <p className="font-semibold flex items-center">
                        <FcRules className="mr-2" />
                        Nội quy:
                      </p>
                      <div className="pl-4">
                        <p className="whitespace-pre-wrap">
                          {dataPost.Dang_Bai_Cho_Thue_NoiQuy}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End: Nội quy */}
                {dataPost.Dang_Bai_Tim_Tro_YeuCau && (
                  <div className="col-span-6">
                    <div className="w-full flex flex-col flex-wrap">
                      <p className="font-semibold flex items-center">
                        <FcRules className="mr-2" />
                        Yêu cầu:
                      </p>
                      <div className="pl-4">
                        <p className="whitespace-pre-wrap">
                          {dataPost.Dang_Bai_Tim_Tro_YeuCau}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End: Yêu cầu */}
              </div>
            </div>
            {/* End: Nội dung */}
          </div>

          {/* Start: Hình ảnh */}
          <div className={clsx('flex justify-center flex-wrap gap-1')}>
            <div
              className={`${dataPost.Dang_Bai_Cho_Thue_DataFile ? 'flex item-center justify-center' : 'hidden'}`}
            >
              <img
                src={
                  dataPost.Dang_Bai_Cho_Thue_DataFile &&
                  dataPost.Dang_Bai_Cho_Thue_TenFile?.split('.')[1]
                    ? `data:image/${dataPost.Dang_Bai_Cho_Thue_TenFile?.split('.')[1] ?? 'jpg'};base64,` +
                      convertBufferToBase64(
                        dataPost.Dang_Bai_Cho_Thue_DataFile?.data,
                      )
                    : noImage
                }
                alt={dataPost.Dang_Bai_Cho_Thue_TenFile}
                className={clsx(
                  dataPost.Dang_Bai_Cho_Thue_TenFile?.split('.')[1]
                    ? 'w-60'
                    : 'w-full',
                )}
              />
            </div>
            <div
              className={`${dataPost.Dang_Bai_Cho_Thue_DataFile_1 ? 'flex item-center justify-center' : 'hidden'}`}
            >
              <img
                src={
                  dataPost.Dang_Bai_Cho_Thue_DataFile_1 &&
                  dataPost.Dang_Bai_Cho_Thue_TenFile_1?.split('.')[1]
                    ? `data:image/${dataPost.Dang_Bai_Cho_Thue_TenFile_1?.split('.')[1] ?? 'jpg'};base64,` +
                      convertBufferToBase64(
                        dataPost.Dang_Bai_Cho_Thue_DataFile_1?.data,
                      )
                    : noImage
                }
                alt={dataPost.Dang_Bai_Cho_Thue_TenFile_1}
                className={clsx(
                  dataPost.Dang_Bai_Cho_Thue_TenFile_1?.split('.')[1]
                    ? 'w-60'
                    : 'w-full',
                )}
              />
            </div>
            <div
              className={`${dataPost.Dang_Bai_Cho_Thue_DataFile_2 ? 'flex item-center justify-center' : 'hidden'}`}
            >
              <img
                src={
                  dataPost.Dang_Bai_Cho_Thue_DataFile_2 &&
                  dataPost.Dang_Bai_Cho_Thue_TenFile_2?.split('.')[1]
                    ? `data:image/${dataPost.Dang_Bai_Cho_Thue_TenFile_2?.split('.')[1] ?? 'jpg'};base64,` +
                      convertBufferToBase64(
                        dataPost.Dang_Bai_Cho_Thue_DataFile_2?.data,
                      )
                    : noImage
                }
                alt={dataPost.Dang_Bai_Cho_Thue_TenFile_2}
                className={clsx(
                  dataPost.Dang_Bai_Cho_Thue_TenFile_2?.split('.')[1]
                    ? 'w-60'
                    : 'w-full',
                )}
              />
            </div>
            <div
              className={`${dataPost.Dang_Bai_Cho_Thue_DataFile_3 ? 'flex item-center justify-center' : 'hidden'}`}
            >
              <img
                src={
                  dataPost.Dang_Bai_Cho_Thue_DataFile_3 &&
                  dataPost.Dang_Bai_Cho_Thue_TenFile_3?.split('.')[1]
                    ? `data:image/${dataPost.Dang_Bai_Cho_Thue_TenFile_3?.split('.')[1] ?? 'jpg'};base64,` +
                      convertBufferToBase64(
                        dataPost.Dang_Bai_Cho_Thue_DataFile_3?.data,
                      )
                    : noImage
                }
                alt={dataPost.Dang_Bai_Cho_Thue_TenFile_3}
                className={clsx(
                  dataPost.Dang_Bai_Cho_Thue_TenFile_3?.split('.')[1]
                    ? 'w-60'
                    : 'w-full',
                )}
              />
            </div>
            <div
              className={`${dataPost.Dang_Bai_Cho_Thue_DataFile_4 ? 'flex item-center justify-center' : 'hidden'}`}
            >
              <img
                src={
                  dataPost.Dang_Bai_Cho_Thue_DataFile_4 &&
                  dataPost.Dang_Bai_Cho_Thue_TenFile_4?.split('.')[1]
                    ? `data:image/${dataPost.Dang_Bai_Cho_Thue_TenFile_4?.split('.')[1]};base64,` +
                      convertBufferToBase64(
                        dataPost.Dang_Bai_Cho_Thue_DataFile_4?.data,
                      )
                    : noImage
                }
                alt={dataPost.Dang_Bai_Cho_Thue_TenFile_4}
                height={80}
                className={clsx(
                  dataPost.Dang_Bai_Cho_Thue_TenFile_4?.split('.')[1]
                    ? 'w-60'
                    : 'w-full',
                )}
              />
            </div>
          </div>
          {/* End: Hình ảnh */}

          {/* Start: Reaction */}
          <div className={[bem.m('reaction'), ' flex flex-col gap-y-2 p-2']}>
              <div className="flex items-center justify-between border-t pt-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaHeart className="text-xl text-red-500" />
                  <p>
                    {/* {dataPost.Dang_Bai_Cho_Thue_YeuThich ??
                      dataPost.Dang_Bai_Tim_Tro_YeuThich} */}
                      {likeCount}
                  </p>
                </div>
                <div className="">
                  {dataPost.Dang_Bai_Cho_Thue_BinhLuan
                    ? dataPost.Dang_Bai_Cho_Thue_BinhLuan
                    : dataPost.Dang_Bai_Tim_Tro_BinhLuan
                      ? dataPost.Dang_Bai_Tim_Tro_BinhLuan
                      : 0}{' '}
                  bình luận
                </div>
              </div>
              <div className="flex items-center justify-around border-t border-b">
                <div
                  className="w-full flex justify-center items-center cursor-pointer gap-2 p-2 text-gray-600 hover:bg-slate-100"
                  onClick={handleLike}
                >
                  {!tym ? (
                    <>
                      <LuHeart className="text-2xl hover:text-red-600" />
                      <span className="font-medium">Thích</span>
                    </>
                  ) : (
                    <>
                      <FaHeart className="text-2xl hover:text-red-600" />
                      <span className="font-medium">Thích</span>
                    </>
                  )}
                </div>
                <div
                  onClick={() => {
                    const tp = dataPost.Dang_Bai_Cho_Thue_IDBaiDang
                      ? 'Dang_Bai_Cho_Thue'
                      : 'Dang_Bai_Tim_Tro'
                    setTypePost(tp)
                    handleShowComment(tp)
                  }}
                  className="w-full flex justify-center items-center cursor-pointer gap-2 p-2 text-gray-600 hover:bg-slate-100"
                >
                  <LuMessagesSquare className="text-2xl hover:text-uneti-primary" />
                  <span className="font-medium">Bình luận</span>
                </div>
              </div>
            </div>
          {/* End: Reaction */}
        </div>
          {/* List Comment */}
          {listComment.length > 0 && (
            <div className="col-start-2 col-span-10 snap-y  overflow-auto">
              <div className=" flex flex-col max-h-64 overflow-auto ">
                {listComment.map((c, index) => (
                  <div key={index} className="flex items-center my-3 ml-6">
                  <img
                    src={c.Anh ? c.Anh : noAvatar}
                    alt="Ảnh đại diện"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{c.HoTen}</p>
                    <p className="text-lg">{c.Dang_PhanHoi_BinhLuanNguoiDang}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          )}
          {/* Handle Comment */}
          {isComment && (
            <>
              <div className="col-span-12 px-2 mb-2">
                <div className="relative pl-3 pr-5 pt-2 pb-10 border border-slate-200 rounded-md">
                  <DebounceInput
                    inputRef={inputRef}
                    element="textarea"
                    minLength={2}
                    debounceTimeout={300}
                    className="w-full focus:outline-none min-h-[10px] resize-none no-scrollbar"
                    placeholder={`Bình luận với vai trò ${dataSV.HoDem + ' ' + dataSV.Ten}`}
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                  />
                  <div
                    className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-slate-200 hover:rounded-full hover:text-gray-600"
                    onClick={handleSubmitComment}
                  >
                    <LuSendHorizonal size={20} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </>
          )}
          {/* End: Comment */}
          </div>
        </div>
      </div>
  )
}

PostItemNhaO.propTypes = {
  dataPost: PropTypes.object.isRequired,
}

export default PostItemNhaO
