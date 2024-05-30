import { useEffect, useState } from 'react'
import DoDungCaNhanView from './DoDungCaNhanView'
import { get_ListBaiDang_DoDungCaNhan } from '@/Apis/ChiaSevaKetNoi/apiDoDungCaNhan'

function DoDungCaNhan() {
  const [loading, setLoading] = useState(false)
  const [listDDCN, setListDDCN] = useState([])

  const fetchDataDDCN = () => {
    setLoading(true)
    get_ListBaiDang_DoDungCaNhan()
      .then((res) => {
        setLoading(false)
        if (res.status === 200) {
          setListDDCN(res.data.body)
        }

        console.log(
          '🚀 ~ file: DoDungCaNhan.jsx:18 ~ .then ~ res.data.body:',
          res.data.body,
        )
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  useEffect(() => {
    fetchDataDDCN()
  }, [])

  return <DoDungCaNhanView loading={loading} listDDCN={listDDCN} />
}

export default DoDungCaNhan
