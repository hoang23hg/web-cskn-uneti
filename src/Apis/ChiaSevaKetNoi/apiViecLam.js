import http from '@/Configs/http'

// 1. API ĐĂNG BÀI
// 1.1. GET: Danh sách đăng bài Việc làm
export const get_ListDangBai_ViecLam = () => {
  return http.get('SP_ChiaSe&KetNoi_ViecLam_TiepNhan/Dang_Bai_ViecLam_Load',
    {
      params:{
        SoTrang: 1
      }
    }
  )
}

// 1.2. POST: Đăng bài Việc làm
export const post_DangBai_ViecLam = (data = {}) => {
  return http.post(
    'SP_ChiaSe&KetNoi_ViecLam_TiepNhan/Dang_Bai_ViecLam_Add_Para',
    data,
  )
}

// 1.3. DELETE: Bài đăng Việc làm
export const del_DangBai_ViecLam = (Dang_Bai_ViecLam_IDBaiDang) => {
  return http.delete(
    'SP_ChiaSe&KetNoi_ViecLam_TiepNhan/Dang_Bai_ViecLam_Del_Para',
    {
      data: {
        Dang_Bai_ViecLam_IDBaiDang,
      },
    },
  )
}
