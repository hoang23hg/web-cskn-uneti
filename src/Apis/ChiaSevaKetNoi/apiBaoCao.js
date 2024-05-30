import http from '@/Configs/http'

// 1. API BÁO CÁO
/**
 *
 * @param {*} data : is Object, about:
 * Dang_BaoCao_IDNguoiDung: string
 * Dang_BaoCao_LoaiNguoiDung: string
 * Dang_BaoCao_TenBang: string
 * Dang_BaoCao_IDBaiViet: string
 * Dang_BaoCao_NoiDung: string
 * Dang_BaoCao_NguonTiepNhan: string
 * @returns
 */
export const post_BaoCao_BaiDang = (data = {}) => {
  return http.post('SP_ChiaSe&KetNoi_BaoCao_TiepNhan/Add_Para', data)
}
