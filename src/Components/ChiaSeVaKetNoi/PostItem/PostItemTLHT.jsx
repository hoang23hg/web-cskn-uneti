import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useNamespace, useClickOutside } from '@/Services/Hooks'
import noAvatar from '@/assets/Images/noavatar.png'
import noImage from '@/assets/Images/no-image.jpg'
import { calculateTimeDifference } from '@/Services/Utils/dateTimeUtils'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import {
  LuBookOpen,
  LuCalendarRange,
  LuFileSearch2,
  LuHeart,
  LuMessagesSquare,
  LuMoreVertical,
  LuSendHorizonal,
  LuUser2,
  LuX,
} from 'react-icons/lu'
import { MdBookmark, MdAnnouncement } from 'react-icons/md'
import { TiMediaPlay } from 'react-icons/ti'
import clsx from 'clsx'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DebounceInput } from 'react-debounce-input'
import AutoScrollTop from '@/Components/BackToTop/AutoScrollTop'
import { useEffect } from 'react'
import {
  get_ListPhanHoiGoc,
  post_PhanHoi,
  
} from '@/Apis/ChiaSevaKetNoi/apiBinhLuan'
import { FaHeart } from 'react-icons/fa6'
import { put_DangBai_PhongTro_YeuThich } from '@/Apis/ChiaSevaKetNoi/apiPhongTro'
import Swal from 'sweetalert2'
import { post_BaoCao_BaiDang } from '@/Apis/ChiaSevaKetNoi/apiBaoCao'

const PostItemTLHT = (props) => {
  const { dataPost } = props
  const dataSV = DataSinhVien()
  const bem = useNamespace('cskn')
  const [isComment, setIsComment] = useState(false)
  const [listComment, setListComment] = useState([])
  const [showMoreActionPost, setShowMoreActionPost] = useState(false)
  const [comment, setComment] = useState('')
  const [tym, setTym] = useState(false)
  const [typePost, setTypePost] = useState('')
  const showMoreActionRef = useRef()
  const inputRef = useRef()
  const [saved, setSaved] = useState(false)
  const [report, setReport] = useState(false)

  const handleShowMoreActionPost = () => {
    setShowMoreActionPost(!showMoreActionPost)
  }
  useClickOutside(showMoreActionRef, () => {
    setShowMoreActionPost(false)
  })

  // fetch data
  const handleSubmitComment = async () => {
    const dataComment = {
      Dang_PhanHoi_IDPhanHoiCha: null,
      Dang_PhanHoi_IDBaiDang:
        dataPost.Dang_Bai_TaiLieuHocTap_IDBaiDang ??
        dataPost.Dang_SP_TaiLieuHocTap_IDBaiDang,
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
      Dang_Bai_TaiLieuHocTap_YeuThich: '1',
      Dang_SP_TaiLieuHocTap_YeuThich: '1',
    }
    await put_DangBai_PhongTro_YeuThich(dataTym)
    if (dataPost.Dang_SP_TaiLieuHocTap_YeuThich)
      dataPost.Dang_SP_TaiLieuHocTap_YeuThich =
        dataPost.Dang_SP_TaiLieuHocTap_YeuThich
          ? dataPost.Dang_SP_TaiLieuHocTap_YeuThich + yeuthich
          : 0 + yeuthich
    else
      dataPost.Dang_Bai_TaiLieuHocTap_YeuThich =
        dataPost.Dang_Bai_TaiLieuHocTap_YeuThich
          ? dataPost.Dang_Bai_TaiLieuHocTap_YeuThich + yeuthich
          : 0 + yeuthich
    setTym(!tym)
  }

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
        Dang_BaoCao_IDBaiViet: dataPost.Dang_Bai_TaiLieuHocTap_IDBaiDang ?? dataPost.Dang_SP_TaiLieuHocTap_IDBaiDang,
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
    if (dataPost.Dang_SP_TaiLieuHocTap_IDBaiDang) {
      setTypePost('Dang_SP_TaiLieuHocTap')
    } else {
      setTypePost('Dang_Bai_TaiLieuHocTap')
    }
  }, [])


  const handleShowComment = async (type) => {
    setIsComment(true)
    const idBaiDang =
      dataPost.Dang_Bai_TaiLieuHocTap_IDBaiDang ??
      dataPost.Dang_SP_TaiLieuHocTap_IDBaiDang
    const res = await get_ListPhanHoiGoc(idBaiDang, type)
    if (res.status === 200) {
      const data = await res.data.body
      setListComment(data)
    }
  }
  // tạo hàm xử lý 'HandleSavePost' 
  const handleSavePost = async () =>{
    try {
      const response = await post_PhanHoi(
        {  
          
        }
      )
      setSaved(true)
      Swal.fire({
        title: 'Thành công!',
        text: 'Bài viết đã được lưu.',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }catch (error) {
      console.error("Lỗi khi lưu bài viết: ", error);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi lưu bài viết. Vui lòng thử lại sau.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleHideComment = () => {
    setIsComment(false)
  }

  return (
    <div className={[bem.b('tlht')]}>
      <div
        className={clsx('bg-white rounded-md border border-gray-200 shadow-md')}
      >
        <div className="grid grid-cols-12">
          <div className={[bem.em('post-item', 'content'), ` col-span-12`]}>
            <div className="flex flex-col gap-y-2 p-2">
              {/* Start: Loại bài viết */}
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold border border-uneti-primary-lighter text-uneti-primary-lighter px-2 py-1 rounded-md w-16 text-center my-2">
                  {dataPost.Dang_SP_TaiLieuHocTap_Gia ? 'Sản phẩm' : 'Bài viết'}
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
                {/* Info */}
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
                      {dataPost.Dang_Bai_TaiLieuHocTap_NgayDang
                        ? calculateTimeDifference(
                            dataPost.Dang_Bai_TaiLieuHocTap_NgayDang,
                          )
                        : calculateTimeDifference(
                            dataPost.Dang_SP_TaiLieuHocTap_NgayDang,
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
                      showMoreActionPost ? 'block' : 'hidden',
                    )}
                  >
                    <ul className="w-[180px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md flex flex-col">
                      <li>
                        <p className=" rounded-t-md flex items-center gap-x-1 p-2 hover:bg-gray-200 hover:text-uneti-primary-lighter cursor-pointer">
                          <MdBookmark size={24} />
                          <button onClick={handleSavePost}>
                            {saved ? "Đã lưu" : "Lưu bài viết"}
                          </button>
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
                  {dataPost.Dang_SP_TaiLieuHocTap_TenSanPham && (
                    <div className="col-span-6">
                      <div className="flex gap-x-2">
                        <p className="font-semibold flex items-center">
                          <LuBookOpen
                            className="text-uneti-primary mr-2"
                            size={18}
                          />
                          Tên sản phẩm:
                        </p>
                        <p>{dataPost.Dang_SP_TaiLieuHocTap_TenSanPham}</p>
                      </div>
                    </div>
                  )}
                  <div className="col-span-6 lg:col-span-3">
                    <div className="flex gap-x-2">
                      <p className="font-semibold flex items-center">
                        <LuCalendarRange
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Khoa:
                      </p>
                      <p>
                        {dataPost.Dang_Bai_TaiLieuHocTap_Khoa ??
                          dataPost.Dang_SP_TaiLieuHocTap_Khoa}
                      </p>
                    </div>
                  </div>
                  {/* End: Khoa */}
                  <div className="col-span-6 lg:col-span-3">
                    <div className="flex gap-x-2">
                      <p className="font-semibold flex items-center">
                        <LuCalendarRange
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Ngành:
                      </p>
                      <p>
                        {dataPost.Dang_Bai_TaiLieuHocTap_Nganh ??
                          dataPost.Dang_SP_TaiLieuHocTap_Nganh}
                      </p>
                    </div>
                  </div>
                  {/* End: Ngành */}
                  <div className="col-span-6 lg:col-span-3">
                    <div className="flex gap-x-2">
                      <p className="font-semibold flex items-center">
                        <LuCalendarRange
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Thể loại:
                      </p>
                      <p>
                        {dataPost.Dang_Bai_TaiLieuHocTap_TheLoai ??
                          dataPost.Dang_SP_TaiLieuHocTap_TheLoai}
                      </p>
                    </div>
                  </div>
                  {/* End: Thể loại */}
                  <div className="col-span-6 lg:col-span-3">
                    <div className="flex gap-x-2">
                      <p className="font-semibold flex items-center">
                        <LuCalendarRange
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Năm xuất bản:
                      </p>
                      <p>
                        {dataPost.Dang_Bai_TaiLieuHocTap_NamXuatBan ??
                          dataPost.Dang_SP_TaiLieuHocTap_NamXuatBan}
                      </p>
                    </div>
                  </div>
                  {/* End: Năm xuất bản */}
                  <div className="col-span-6 lg:col-span-3">
                    <div className="flex gap-x-2">
                      <p className="font-semibold flex items-center">
                        <LuUser2
                          className="text-uneti-primary mr-2"
                          size={18}
                        />
                        Tác giả:
                      </p>
                      <p>
                        {dataPost.Dang_Bai_TaiLieuHocTap_TacGia ??
                          dataPost.Dang_SP_TaiLieuHocTap_Gia}
                      </p>
                    </div>
                  </div>
                  {/* End: Tác giả */}
                  {dataPost.Dang_SP_TaiLieuHocTap_Gia && (
                    <div className="col-span-6 lg:col-span-3">
                      <div className="flex gap-x-2">
                        <p className="font-semibold flex items-center">
                          <LuBookOpen
                            className="text-uneti-primary mr-2"
                            size={18}
                          />
                          Giá bán:
                        </p>
                        <p>
                          {dataPost.Dang_SP_TaiLieuHocTap_Gia.toLocaleString()}
                          <sup>đ</sup>
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="col-span-6">
                    <p className="font-semibold flex items-center">
                      <LuFileSearch2
                        className="text-uneti-primary mr-2"
                        size={18}
                      />
                      Thông tin thêm:
                    </p>
                    <p>
                      {dataPost.Dang_Bai_TaiLieuHocTap_NoiDung ??
                        dataPost.Dang_SP_TaiLieuHocTap_NoiDung}
                    </p>
                  </div>
                </div>
              </div>
              {/* End: Nội dung */}
            </div>

            {/* Start: Hình ảnh */}
            <div className={clsx('flex justify-center flex-wrap gap-1')}>
              <div
                className={`${dataPost.Dang_Bai_TaiLieuHocTap_DataFile || dataPost.Dang_SP_TaiLieuHocTap_DataFile ? 'flex item-center justify-center' : 'hidden'}`}
              >
                {(dataPost.Dang_Bai_TaiLieuHocTap_DataFile &&
                  dataPost.Dang_Bai_TaiLieuHocTap_TenFile?.split('.')[1]) ||
                (dataPost.Dang_SP_TaiLieuHocTap_DataFile &&
                  dataPost.Dang_SP_TaiLieuHocTap_TenFile?.split('.')[1]) ? (
                  <img
                    src={
                      dataPost.Dang_Bai_TaiLieuHocTap_DataFile &&
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile?.split('.')[1]
                        ? `data:image/${dataPost.Dang_Bai_TaiLieuHocTap_TenFile?.split('.')[1]};base64,` +
                          convertBufferToBase64(
                            dataPost.Dang_Bai_TaiLieuHocTap_DataFile?.data,
                          )
                        : dataPost.Dang_SP_TaiLieuHocTap_DataFile &&
                            dataPost.Dang_SP_TaiLieuHocTap_TenFile?.split(
                              '.',
                            )[1]
                          ? `data:image/${dataPost.Dang_SP_TaiLieuHocTap_TenFile?.split('.')[1]};base64,` +
                            convertBufferToBase64(
                              dataPost.Dang_SP_TaiLieuHocTap_DataFile?.data,
                            )
                          : null
                    }
                    alt={dataPost.Dang_Bai_TaiLieuHocTap_TenFile}
                    className={clsx(
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile?.split('.')[1] ||
                        dataPost.Dang_SP_TaiLieuHocTap_TenFile?.split('.')[1]
                        ? 'w-60 object-cover'
                        : 'w-full',
                    )}
                  />
                ) : null}
              </div>
              <div
                className={`${dataPost.Dang_Bai_TaiLieuHocTap_DataFile_1 || dataPost.Dang_SP_TaiLieuHocTap_DataFile_1 ? 'flex item-center justify-center' : 'hidden'}`}
              >
                {(dataPost.Dang_Bai_TaiLieuHocTap_DataFile_1 &&
                  dataPost.Dang_Bai_TaiLieuHocTap_TenFile_1?.split('.')[1]) ||
                (dataPost.Dang_SP_TaiLieuHocTap_DataFile_1 &&
                  dataPost.Dang_SP_TaiLieuHocTap_TenFile_1?.split('.')[1]) ? (
                  <img
                    src={
                      dataPost.Dang_Bai_TaiLieuHocTap_DataFile_1 &&
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_1?.split('.')[1]
                        ? `data:image/${dataPost.Dang_Bai_TaiLieuHocTap_TenFile_1?.split('.')[1]};base64,` +
                          convertBufferToBase64(
                            dataPost.Dang_Bai_TaiLieuHocTap_DataFile_1?.data,
                          )
                        : dataPost.Dang_SP_TaiLieuHocTap_DataFile_1 &&
                            dataPost.Dang_SP_TaiLieuHocTap_TenFile_1?.split(
                              '.',
                            )[1]
                          ? `data:image/${dataPost.Dang_SP_TaiLieuHocTap_TenFile_1?.split('.')[1]};base64,` +
                            convertBufferToBase64(
                              dataPost.Dang_SP_TaiLieuHocTap_DataFile_1?.data,
                            )
                          : null
                    }
                    alt={
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_1 ??
                      dataPost.Dang_SP_TaiLieuHocTap_TenFile_1
                    }
                    className={clsx(
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_1?.split(
                        '.',
                      )[1] ||
                        dataPost.Dang_SP_TaiLieuHocTap_TenFile_1?.split('.')[1]
                        ? 'w-60 object-cover'
                        : 'w-full',
                    )}
                  />
                ) : null}
              </div>
              <div
                className={`${dataPost.Dang_Bai_TaiLieuHocTap_DataFile_2 || dataPost.Dang_SP_TaiLieuHocTap_DataFile_2 ? 'flex item-center justify-center' : 'hidden'}`}
              >
                {(dataPost.Dang_Bai_TaiLieuHocTap_DataFile_2 &&
                  dataPost.Dang_Bai_TaiLieuHocTap_TenFile_2?.split('.')[1]) ||
                (dataPost.Dang_SP_TaiLieuHocTap_DataFile_2 &&
                  dataPost.Dang_SP_TaiLieuHocTap_TenFile_2?.split('.')[1]) ? (
                  <img
                    src={
                      dataPost.Dang_Bai_TaiLieuHocTap_DataFile_2 &&
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_2?.split('.')[1]
                        ? `data:image/${dataPost.Dang_Bai_TaiLieuHocTap_TenFile_2?.split('.')[1]};base64,` +
                          convertBufferToBase64(
                            dataPost.Dang_Bai_TaiLieuHocTap_DataFile_2?.data,
                          )
                        : dataPost.Dang_SP_TaiLieuHocTap_DataFile_2 &&
                            dataPost.Dang_SP_TaiLieuHocTap_TenFile_2?.split(
                              '.',
                            )[1]
                          ? `data:image/${dataPost.Dang_SP_TaiLieuHocTap_TenFile_2?.split('.')[1]};base64,` +
                            convertBufferToBase64(
                              dataPost.Dang_SP_TaiLieuHocTap_DataFile_2?.data,
                            )
                          : null
                    }
                    alt={
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_2 ??
                      dataPost.Dang_SP_TaiLieuHocTap_TenFile_2
                    }
                    className={clsx(
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_2?.split(
                        '.',
                      )[1] ||
                        dataPost.Dang_SP_TaiLieuHocTap_TenFile_2?.split('.')[1]
                        ? 'w-60 object-cover'
                        : 'w-full',
                    )}
                  />
                ) : null}
              </div>
              <div
                className={`${dataPost.Dang_Bai_TaiLieuHocTap_DataFile_3 || dataPost.Dang_SP_TaiLieuHocTap_DataFile_3 ? 'flex item-center justify-center' : 'hidden'}`}
              >
                {(dataPost.Dang_Bai_TaiLieuHocTap_DataFile_3 &&
                  dataPost.Dang_Bai_TaiLieuHocTap_TenFile_3?.split('.')[1]) ||
                (dataPost.Dang_SP_TaiLieuHocTap_DataFile_3 &&
                  dataPost.Dang_SP_TaiLieuHocTap_TenFile_3?.split('.')[1]) ? (
                  <img
                    src={
                      dataPost.Dang_Bai_TaiLieuHocTap_DataFile_3 &&
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_3?.split('.')[1]
                        ? `data:image/${dataPost.Dang_Bai_TaiLieuHocTap_TenFile_3?.split('.')[1]};base64,` +
                          convertBufferToBase64(
                            dataPost.Dang_Bai_TaiLieuHocTap_DataFile_3?.data,
                          )
                        : dataPost.Dang_SP_TaiLieuHocTap_DataFile_3 &&
                            dataPost.Dang_SP_TaiLieuHocTap_TenFile_3?.split(
                              '.',
                            )[1]
                          ? `data:image/${dataPost.Dang_SP_TaiLieuHocTap_TenFile_3?.split('.')[1]};base64,` +
                            convertBufferToBase64(
                              dataPost.Dang_SP_TaiLieuHocTap_DataFile_3?.data,
                            )
                          : null
                    }
                    alt={
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_3 ??
                      dataPost.Dang_SP_TaiLieuHocTap_TenFile_3
                    }
                    className={clsx(
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_3?.split(
                        '.',
                      )[1] ||
                        dataPost.Dang_SP_TaiLieuHocTap_TenFile_3?.split('.')[1]
                        ? 'w-60 object-cover'
                        : 'w-full',
                    )}
                  />
                ) : null}
              </div>
              <div
                className={`${dataPost.Dang_Bai_TaiLieuHocTap_DataFile_4 || dataPost.Dang_SP_TaiLieuHocTap_DataFile_4 ? 'flex item-center justify-center' : 'hidden'}`}
              >
                {(dataPost.Dang_Bai_TaiLieuHocTap_DataFile_4 &&
                  dataPost.Dang_Bai_TaiLieuHocTap_TenFile_4?.split('.')[1]) ||
                (dataPost.Dang_SP_TaiLieuHocTap_DataFile_4 &&
                  dataPost.Dang_SP_TaiLieuHocTap_TenFile_4?.split('.')[1]) ? (
                  <img
                    src={
                      dataPost.Dang_Bai_TaiLieuHocTap_DataFile_4 &&
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_4?.split('.')[1]
                        ? `data:image/${dataPost.Dang_Bai_TaiLieuHocTap_TenFile_4?.split('.')[1]};base64,` +
                          convertBufferToBase64(
                            dataPost.Dang_Bai_TaiLieuHocTap_DataFile_4?.data,
                          )
                        : dataPost.Dang_SP_TaiLieuHocTap_DataFile_4 &&
                            dataPost.Dang_SP_TaiLieuHocTap_TenFile_4?.split(
                              '.',
                            )[1]
                          ? `data:image/${dataPost.Dang_SP_TaiLieuHocTap_TenFile_4?.split('.')[1]};base64,` +
                            convertBufferToBase64(
                              dataPost.Dang_SP_TaiLieuHocTap_DataFile_4?.data,
                            )
                          : null
                    }
                    alt={
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_4 ??
                      dataPost.Dang_SP_TaiLieuHocTap_TenFile_4
                    }
                    className={clsx(
                      dataPost.Dang_Bai_TaiLieuHocTap_TenFile_4?.split(
                        '.',
                      )[1] ||
                        dataPost.Dang_SP_TaiLieuHocTap_TenFile_4?.split('.')[1]
                        ? 'w-60 object-cover'
                        : 'w-full',
                    )}
                  />
                ) : null}
              </div>
            </div>
            {/* End: Hình ảnh */}

            {/* Start: Reaction */}
            <div className={[bem.m('reaction'), ' flex flex-col gap-y-2 p-2']}>
              <div className="flex items-center justify-between border-t pt-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaHeart className="text-xl text-red-500" />
                  <p>
                    {dataPost.Dang_Bai_TaiLieuHocTap_YeuThich ??
                      dataPost.Dang_SP_TaiLieuHocTap_YeuThich}
                  </p>
                </div>
                <div className="">
                  {dataPost.Dang_Bai_TaiLieuHocTap_BinhLuan
                    ? dataPost.Dang_Bai_TaiLieuHocTap_BinhLuan
                    : dataPost.Dang_SP_TaiLieuHocTap_BinhLuan
                      ? dataPost.Dang_SP_TaiLieuHocTap_BinhLuan
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
                    const tp = dataPost.Dang_Bai_TaiLieuHocTap_IDBaiDang
                      ? 'Dang_Bai_TaiLieuHocTap'
                      : 'Dang_SP_TaiLieuHocTap'
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
          {/* End: Content Post */}

          {/* Start: Comment */}

          {/* List Comment */}
          {listComment.length > 0 && (
            <div className="col-start-2 col-span-10 snap-y  overflow-auto">
            <div className=" flex flex-col max-h-64 overflow-auto ">
              {listComment.map((c, index) => (
                <div key={index} className="flex items-center my-3">
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

PostItemTLHT.propTypes = {
  dataPost: PropTypes.any,
}

export default PostItemTLHT
