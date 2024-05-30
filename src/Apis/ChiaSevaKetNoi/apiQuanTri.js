import http from '@/Configs/http'

// 1. API QUẢN TRỊ ĐĂNG BÀI
// 1.1. PUT: Đăng bài show, check -> cho phép hiển thị bài
export const put_DangBaiEdit_ShowCheck = (data = {}) => {
  return http.put(
    'SP_ChiaSe&KetNoi_QuanTri_TiepNhan/Dang_Bai_Edit_ShowCheck_Para',
    data,
  )
}

// 2. API QUẢN TRỊ ĐĂNG BÁN
// 2.1. PUT: Báo cáo bài đăng bán
export const put_DangBan_BaoCao = (data = {}) => {
  return http.put(
    'SP_ChiaSe&KetNoi_QuanTri_TiepNhan/Dang_BaoCao_Edit_Para',
    data,
  )
}
