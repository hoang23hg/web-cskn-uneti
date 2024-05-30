import http from '@/Configs/http'

// 1. API PHẢN HỒI/BÌNH LUẬN
// 1.1. GET: Danh sách phản hồi theo phản hồi cha
export const get_ListPhanHoi_ByPhanHoiCha = (Dang_PhanHoi_IDPhanHoiCha) => {
  return http.get(
    'SP_ChiaSe&KetNoi_BinhLuan_TiepNhan/Dang_PhanHoi_Load_ByPhanHoiCha',
    {
      params: { Dang_PhanHoi_IDPhanHoiCha },
    },
  )
}

// 1.2. GET: Danh sách phản hồi cha
/**
 *
 * @param {*} Dang_PhanHoi_IDBaiDang
 * @param {*} Dang_PhanHoi_TenBang : 'Dang_Bai_SP_DoDungCaNhan' | 'Dang_SP_TaiLieuHocTap' | 'Dang_Bai_Tim_Tro' | 'Dang_Bai_ViecLam' | 'Dang_Ban_SP_DoDungCaNhan' | 'Dang_SP_TaiLieuHocTap'
 * @returns
 */
export const get_ListPhanHoiGoc = (
  Dang_PhanHoi_IDBaiDang,
  Dang_PhanHoi_TenBang,
) => {
  return http.get(
    'SP_ChiaSe&KetNoi_BinhLuan_TiepNhan/Dang_PhanHoi_Load_PhanHoiGoc',
    {
      params: {
        Dang_PhanHoi_IDBaiDang,
        Dang_PhanHoi_TenBang,
      },
    },
  )
}

// 1.3. POST: Bình luận
export const post_PhanHoi = (data = {}) => {
  return http.post('SP_ChiaSe&KetNoi_BinhLuan_TiepNhan/Add_Para', data)
}

// 1.4. DELETE: Xóa bình luận
export const del_PhanHoi = (Dang_PhanHoi_IDPhanHoi) => {
  return http.delete('SP_ChiaSe&KetNoi_BinhLuan_TiepNhan/Del_Para', {
    data: { Dang_PhanHoi_IDPhanHoi },
  })
}
