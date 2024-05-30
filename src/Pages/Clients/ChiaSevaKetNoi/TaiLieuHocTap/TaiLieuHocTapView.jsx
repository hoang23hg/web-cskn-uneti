import FormBaiDangCSKN from '@/Components/ChiaSeVaKetNoi/BaiDangCSKN/FormBaiDangCSKN'
import PostItemTLHT from '@/Components/ChiaSeVaKetNoi/PostItem/PostItemTLHT'
import { SkelotonPostItemCSKN } from '@/Components/ChiaSeVaKetNoi/PostItem/SkelotonPostItemCSKN'
import BannerTLHTView from '@/Components/ChiaSeVaKetNoi/TaiLieuHocTap/Banner/BannerTLHTView'
import Loading from '@/Components/Loading/Loading'
import { calculateTimeDifference } from '@/Services/Utils/dateTimeUtils'
import clsx from 'clsx'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React from 'react'

function TaiLieuHocTapView(props) {
  const { loading, onLoading, listTLHT, isLoadMore, elementRef } = props
  return (
    <div className={clsx('flex flex-col gap-10')}>
      {/* List Tài liệu học tập */}
      {loading ? (
        <div className="flex flex-col gap-6">
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {listTLHT?.map((item, index) => {
            const resultDatePost = calculateTimeDifference(
              item.Dang_Bai_TaiLieuHocTap_NgayDang,
            )
            return (
              <React.Fragment key={index}>
                <PostItemTLHT dataPost={item} />
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

TaiLieuHocTapView.propTypes = {
  loading: PropTypes.bool,
  listTLHT: PropTypes.array,
  isLoadMore: PropTypes.bool,
  elementRef: PropTypes.object,
}

export default React.memo(TaiLieuHocTapView)
