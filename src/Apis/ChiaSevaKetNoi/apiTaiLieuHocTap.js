import http from '@/Configs/http'
import { data } from 'autoprefixer'
// 1. API ĐĂNG BÀI
// 1.1. GET: Danh sách bài đăng Tài liệu học tập
export const get_ListDangBai_TaiLieuHocTap = () => {
  return http.get(
    'SP_ChiaSe&KetNoi_TaiLieuHocTap_TiepNhan/Dang_Bai_TaiLieuHocTap_Load', 
    {
      params: {
        SoTrang: 1
      },
    }
  )
}
// 1.2. POST: Đăng bài Tài liệu học tập
export const post_DangBai_TaiLieuHocTap = (data = {}) => {
  return http.post(
    'SP_ChiaSe&KetNoi_TaiLieuHocTap_TiepNhan/Dang_Bai_TaiLieuHocTap_Add_Para',
    data,
  )
}

// 1.3. DELETE: Xóa bài đăng Tài liệu học tập
export const del_DangBai_TaiLieuHocTap = (Dang_Bai_TaiLieuHocTap_IDBaiDang) => {
  return http.delete(
    'SP_ChiaSe&KetNoi_TaiLieuHocTap_TiepNhan/Dang_Bai_TaiLieuHocTap_Del_Para',
    {
      data: { Dang_Bai_TaiLieuHocTap_IDBaiDang },
    },
  )
}

// 2. API ĐĂNG BÁN
// 2.1. GET: Danh sách đăng bán Tài liệu học tập
export const get_ListDangBan_TaiLieuHocTap = () => {
  return http.get(
    'SP_ChiaSe&KetNoi_TaiLieuHocTap_TiepNhan/Dang_SP_TaiLieuHocTap_Load',
    {
      params: {
        SoTrang: 1
      }
    }
  )
}

// 2.2. POST: Đăng bán Tài liệu học tập
export const post_DangBan_TaiLieuHocTap = (data = {}) => {
  return http.post(
    'SP_ChiaSe&KetNoi_TaiLieuHocTap_TiepNhan/Dang_SP_TaiLieuHocTap_Add_Para',
    data,
  )
}

// 2.3. DELETE: Xóa đăng bán Tài liệu học tập
export const del_DangBan_TaiLieuHocTap = (
  Dang_SP_TaiLieuHocTap_IDBaiDangSP,
) => {
  return http.delete(
    'SP_ChiaSe&KetNoi_TaiLieuHocTap_TiepNhan/Dang_SP_TaiLieuHocTap_Del_Para',
    {
      data: {
        Dang_SP_TaiLieuHocTap_IDBaiDangSP,
      },
    },
  )
}

