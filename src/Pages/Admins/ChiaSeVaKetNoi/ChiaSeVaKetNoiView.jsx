import React from 'react'
import PropTypes from 'prop-types'
import ChartCSKNAll from './Charts/ChartAll'
import ChartDDCN from './Charts/ChartDDCN'
import ChartViecLam from './Charts/ChartViecLam'
import ChartNhaO from './Charts/ChartNhaO'
import ChartTLHT from './Charts/ChartTLHT'
import PendingPosts from './PheDuyetbaiDang/PheDuyet'
import ReportedPosts from './XuLyBaoCao/BaoCao'
function QuanTriChiaSeVaKetNoiView(props) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-12">
        <PendingPosts />
      </div>
      
      <div className="col-span-12">
        <ReportedPosts />
      </div>
      {/* Start: Chart Tổng quát */}
      <div className="col-span-12">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-xl text-uneti-primary underline">
            Biểu đồ tổng quát
          </h2>
          <ChartCSKNAll />
        </div>
      </div>
      {/* End: Chart Tổng quát */}

      {/* Start: Chart Tài liệu học tập */}
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-xl text-uneti-primary underline">
            Tài liệu học tập
          </h2>
          <ChartTLHT />
        </div>
      </div>
      {/* End: Chart Tài liệu học tập */}

      {/* Start: Chart Việc làm */}
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-xl text-uneti-primary underline">
            Việc làm
          </h2>
          <ChartViecLam />
        </div>
      </div>
      {/* End: Chart Việc làm */}

      {/* Start: Chart Đồ dùng cá nhân */}
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-xl text-uneti-primary underline">
            Đồ dùng cá nhân
          </h2>
          <ChartDDCN />
        </div>
      </div>
      {/* End: Chart Đồ dùng cá nhân */}

      {/* Start: Chart Nhà ở */}
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-xl text-uneti-primary underline">
            Nhà ở
          </h2>
          <ChartNhaO />
        </div>
      </div>
      {/* End: Chart Nhà ở */}
    </div>
  )
}

QuanTriChiaSeVaKetNoiView.propTypes = {}

export default QuanTriChiaSeVaKetNoiView
