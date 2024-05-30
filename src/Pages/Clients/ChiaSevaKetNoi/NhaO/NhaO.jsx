import { useEffect, useState } from 'react'
import NhaOView from './NhaOView'
import {
  get_ListDangBai_PhongTroChoThue,
  get_ListDangBai_TimPhongTro,
} from '@/Apis/ChiaSevaKetNoi/apiPhongTro'
import { useCallback } from 'react'

function NhaO() {
  const [loading, setLoading] = useState(false)
  const [listPostNhaO, setListPostNhaO] = useState([])
  // fetch data
  const fetchDataPostNhaO = useCallback(async () => {
    setLoading(true)
    try {
      const [resList_ChoThueTro, resList_TimTro] = await Promise.all([
        get_ListDangBai_PhongTroChoThue(),
        get_ListDangBai_TimPhongTro(),
      ])

      if (resList_ChoThueTro.status === 200 && resList_TimTro.status === 200) {
        const data_ChoThueTro = await resList_ChoThueTro.data.body
        const data_TimTro = await resList_TimTro.data.body

        setListPostNhaO([...data_ChoThueTro, ...data_TimTro])
      } else {
        // Xử lý trường hợp không thành công nếu cần
        console.log('Get list post "nhà ở" failed!!!')
      }
    } catch (error) {
      console.log('🚀 ~ file: NhaO.jsx:28 ~ fetchDataPostNhaO ~ error:', error)
      // Xử lý lỗi nếu cần
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDataPostNhaO()
  }, [])

  console.log(listPostNhaO)

  return <NhaOView loading={loading} listPostNhaO={listPostNhaO} />
}

export default NhaO
