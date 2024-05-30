import http from '@/Configs/http'

// 1. API ĐĂNG BÀI
// 1.1. GET: Danh sách bài đăng Đồ dùng cá nhân
export const get_ListBaiDang_DoDungCaNhan = () => {
  return http.get(
    'SP_ChiaSe&KetNoi_DoDungCaNhan_TiepNhan/Dang_Bai_SP_DoDungCaNhan_Load',
    {
      params: {
        SoTrang: 1
      }
    }
  )
}
// 1.2. POST: Đăng bài Đồ dùng cá nhân
export const post_DangBai_DoDungCaNhan = (data = {}) => {
  return http.post(
    'SP_ChiaSe&KetNoi_DoDungCaNhan_TiepNhan/Dang_Bai_SP_DoDungCaNhan_Add_Para',
    data,
  )
}
// 1.3. DELETE: Xóa Đăng bài Đồ dùng cá nhân
export const del_DangBai_DoDungCaNhan = (
  Dang_Bai_SP_DoDungCaNhan_IDBaiDang,
) => {
  return http.delete(
    'SP_ChiaSe&KetNoi_DoDungCaNhan_TiepNhan/Dang_Bai_SP_DoDungCaNhan_Del_Para',
    {
      data: { Dang_Bai_SP_DoDungCaNhan_IDBaiDang },
    },
  )
}

// 2. API ĐĂNG BÁN

// 2.1. GET: Danh sách đăng bán Đồ dùng cá nhân
export const get_ListDangBan_DoDungCaNhan = () => {
  return http.get(
    'SP_ChiaSe&KetNoi_DoDungCaNhan_TiepNhan/Dang_Ban_SP_DoDungCaNhan_Load',
    {
      params: {
        SoTrang: 1
      }
    }
  )
}

// 2.2. POST: Đăng bán Đồ dùng cá nhân
export const post_DangBan_DoDungCaNhan = (data = {}) => {
  return http.post(
    'SP_ChiaSe&KetNoi_DoDungCaNhan_TiepNhan/Dang_Ban_SP_DoDungCaNhan_Add_Para',
    data,
  )
}

// 2.3. DELETE: Xóa Đăng bán Đồ dùng cá nhân
export const del_DangBan_DoDungCaNhan = (
  Dang_Ban_SP_DoDungCaNhan_IDBaiDangSanPham,
) => {
  return http.delete(
    'SP_ChiaSe&KetNoi_DoDungCaNhan_TiepNhan/Dang_Ban_SP_DoDungCaNhan_Del_Para',
    {
      data: { Dang_Ban_SP_DoDungCaNhan_IDBaiDangSanPham },
    },
  )
}
