import { useEffect, useState } from 'react'
import ViecLamView from './ViecLamView'
import { get_ListDangBai_ViecLam } from '@/Apis/ChiaSevaKetNoi/apiViecLam'

function ViecLam() {
  const [loading, setLoading] = useState(false)
  const [listViecLam, setListViecLam] = useState([])

  // fetch data
  const fetchDataViecLam = () => {
    setLoading(true)
    get_ListDangBai_ViecLam()
      .then((res) => {
        setLoading(false)
        if (res.status === 200) {
          setListViecLam(res.data.body)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }
  useEffect(() => {
    fetchDataViecLam()
  }, [])

  return <ViecLamView loading={loading} listViecLam={listViecLam} />
}

export default ViecLam
