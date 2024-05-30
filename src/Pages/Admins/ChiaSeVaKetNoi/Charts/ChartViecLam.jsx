import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { useNamespace } from '@/Services/Hooks'
import './ChartStyle.scss'
import { getDanhSachThongKeYeuCau } from '@/Apis/MotCua/apiThongKe'
import { getRGBColor } from '@/Services/Utils/colorUtils'

const ChartViecLam = (props) => {
  const bem = useNamespace('uneti_chart')

  const apexchartRef = useRef()

  const [loading, setLoading] = useState(true)
  const [dataThongKe, setDataThongKe] = useState([])
  // effect
  useEffect(() => {
    getDanhSachThongKeYeuCau()
      .then((res) => {
        setLoading(false)
        setDataThongKe(res)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div className="my-10 rounded-lg px-4">
        <div
          className={[
            bem.e('view'),
            ' flex flex-col justify-center items-center',
          ]}
        >
          <Chart
            type="donut"
            ref={apexchartRef}
            width={400}
            height={400}
            series={[
              parseInt(dataThongKe[0]?.TK_PT_TiepNhan_DV_KhaoThi),
              parseInt(dataThongKe[0]?.TK_PT_TiepNhan_DV_DaoTao),
            ]}
            options={{
              colors: ['#1a5cff', '#ff4757'],
              chart: {
                width: 400,
                height: 400,
              },
              responsive: [
                {
                  breakpoint: 660,
                  options: {
                    chart: {
                      width: 240,
                      height: 240,
                    },
                  },
                },
              ],
              labels: ['Bài tuyển dụng', 'Chờ phê duyệt'],
              fill: {
                colors: ['#1a5cff', '#ff4757'],
                opacity: [0.9, 0.9, 0.9, 0.9],
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        label: 'TỔNG',
                        fontSize: 24,
                        fontWeight: 600,
                        color: '#336699',
                      },
                    },
                  },
                },
              },
              legend: {
                show: false,
              },
            }}
          />
          <div
            className={[
              bem.e('details'),
              ' flex flex-row flex-wrap gap-5 justify-center',
            ]}
          >
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#1a5cff'),
                })}
              />
              <span>Bài đăng tin tuyển dụng</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#ff4757'),
                })}
              />
              <span>Bài đang đợi phê duyệt</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ChartViecLam.propTypes = {}

export default ChartViecLam
