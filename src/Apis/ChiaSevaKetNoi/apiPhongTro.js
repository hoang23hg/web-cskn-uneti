import http from '@/Configs/http'

// 1. API ĐĂNG BÀI
// 1.1. GET: Danh sách đăng bài Cho thuê trọ
export const get_ListDangBai_PhongTroChoThue = () => {
  return http.get('SP_ChiaSe&KetNoi_PhongTro_TiepNhan/Dang_Bai_Cho_Thue_Load',
  {
    params: {
      SoTrang: 1
    }
  }

  )
}
// 1.2. GET: Danh sách đăng bài tìm trọ
export const get_ListDangBai_TimPhongTro = () => {
  return http.get('SP_ChiaSe&KetNoi_PhongTro_TiepNhan/Dang_Bai_Tim_Tro_Load',
    {
      params: {
        SoTrang: 1
      }
    }
  )
}
// 1.3. POST: Đăng bài cho thuê trọ
export const post_DangBai_ChoThueTro = (data = {}) => {
  return http.post(
    'SP_ChiaSe&KetNoi_PhongTro_TiepNhan/Dang_Bai_Cho_Thue_Add_Para',
    data,
  )
}
// 1.4. POST: Đăng bài tìm trọ
export const post_DangBai_TimTro = (data = {}) => {
  return http.post(
    'SP_ChiaSe&KetNoi_PhongTro_TiepNhan/Dang_Bai_Tim_Tro_Add_Para',
    data,
  )
}
// 1.5. PUT: Đăng bài Yêu thích
export const put_DangBai_PhongTro_YeuThich = (data = {}) => {
  return http.put(
    'SP_ChiaSe&KetNoi_PhongTro_TiepNhan/Dang_Bai_Edit_YeuThich_Para',
    data,
  )
}
// 1.6. DELETE: Xóa bài đăng cho thuê trọ
export const del_DangBai_ThueTro = (Dang_Bai_Cho_Thue_IDBaiDang) => {
  return http.delete(
    'SP_ChiaSe&KetNoi_PhongTro_TiepNhan/Dang_Bai_Cho_Thue_Del_Para',
    {
      data: {
        Dang_Bai_Cho_Thue_IDBaiDang,
      },
    },
  )
}
