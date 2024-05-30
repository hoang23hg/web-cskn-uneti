import PostItemViecLam from '@/Components/ChiaSeVaKetNoi/PostItem/PostItemViecLam'
import { SkelotonPostItemCSKN } from '@/Components/ChiaSeVaKetNoi/PostItem/SkelotonPostItemCSKN'
import Loading from '@/Components/Loading/Loading'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

function ViecLamView(props) {
  const { loading, listViecLam } = props

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
          {listViecLam?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <PostItemViecLam dataPost={item} />
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

ViecLamView.propTypes = {
  loading: PropTypes.bool.isRequired,
  listViecLam: PropTypes.array,
}

export default ViecLamView
