import React from 'react'
import PropTypes from 'prop-types'
import Loading from '@/Components/Loading/Loading'
import PostItemNhaO from '@/Components/ChiaSeVaKetNoi/PostItem/PostItemNhaO'
import clsx from 'clsx'
import { SkelotonPostItemCSKN } from '@/Components/ChiaSeVaKetNoi/PostItem/SkelotonPostItemCSKN'

function NhaOView(props) {
  const { loading, listPostNhaO } = props

  return (
    <div className={clsx('flex flex-col gap-10')}>
      {/* List Tài liệu học tập */}
      {loading === true ? (
        <div className="flex flex-col gap-6">
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
          <SkelotonPostItemCSKN />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {listPostNhaO?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <PostItemNhaO dataPost={item} />
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

NhaOView.propTypes = {
  loading: PropTypes.bool,
  listPostNhaO: PropTypes.array,
}

export default NhaOView
