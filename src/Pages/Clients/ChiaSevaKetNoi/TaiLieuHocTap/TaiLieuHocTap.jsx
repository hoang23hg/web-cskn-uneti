import { useEffect, useRef, useState } from 'react'
import TaiLieuHocTapView from './TaiLieuHocTapView'
import {
  get_ListDangBai_TaiLieuHocTap,
  get_ListDangBan_TaiLieuHocTap,
} from '@/Apis/ChiaSevaKetNoi/apiTaiLieuHocTap'
import { useCallback } from 'react'

function TaiLieuHocTap() {
  const [loading, setLoading] = useState(false)
  const [listTaiLieuHocTap, setListTaiLieuHocTap] = useState([])
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [page, setPage] = useState(0)

  const elementRef = useRef(null)

  // on load more
  function onIntersction(entries) {
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting) {
      fetchDataPostTLHT()
    }
  }

  useEffect(() => {
    fetchDataPostTLHT()
  }, [])
  // fetch
  const fetchDataPostTLHT = useCallback(async () => {
    setLoading(true)
    try {
      const [resListTLHT_BaiDang, resListTLHT_BaiBan] = await Promise.all([
        get_ListDangBai_TaiLieuHocTap(),
        get_ListDangBan_TaiLieuHocTap(),
      ])

      if (
        resListTLHT_BaiDang.status === 200 &&
        resListTLHT_BaiBan.status === 200
      ) {
        const dataBaiDang = await resListTLHT_BaiDang.data.body
        const dataBaiBan = await resListTLHT_BaiBan.data.body

        setListTaiLieuHocTap([...dataBaiDang, ...dataBaiBan])
      } else {
        // Xử lý trường hợp không thành công nếu cần
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <TaiLieuHocTapView
      loading={loading}
      onLoading={setLoading}
      listTLHT={listTaiLieuHocTap}
      isLoadMore={isLoadMore}
      elementRef={elementRef}
    />
  )
}

export default TaiLieuHocTap
