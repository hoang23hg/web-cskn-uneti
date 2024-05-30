import React from 'react'
import PropTypes from 'prop-types'
import Loading from '@/Components/Loading/Loading'
import PostItemDoDungCaNhan from '@/Components/ChiaSeVaKetNoi/PostItem/PostItemDoDungCaNhan'
import clsx from 'clsx'
import { SkelotonPostItemCSKN } from '@/Components/ChiaSeVaKetNoi/PostItem/SkelotonPostItemCSKN'

function DoDungCaNhanView(props) {
  const { loading, listDDCN } = props

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
          {listDDCN?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <PostItemDoDungCaNhan dataPost={item} />
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

DoDungCaNhanView.propTypes = {
  loading: PropTypes.bool.isRequired,
  listDDCN: PropTypes.array,
}

export default DoDungCaNhanView
