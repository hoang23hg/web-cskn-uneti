import { useNamespace } from '@/Services/Hooks'
import React, { useState, useEffect, useRef } from 'react'
import Chart from 'react-apexcharts'

import './ChartStyle.scss'
import { getDanhSachThongKeYeuCau } from '@/Apis/MotCua/apiThongKe'
import { getRGBColor } from '@/Services/Utils/colorUtils'

function ChartCSKNAll() {
  const bem = useNamespace('uneti_chart')

  const apexchartRef = useRef()

  const windowWidth = window.innerWidth
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
    <React.Fragment>
      <div className="my-10 rounded-lg px-4">
        <div
          className={[
            bem.e('view'),
            ' flex flex-col justify-center items-center animate__animated animate__fadeIn',
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
              parseInt(dataThongKe[0]?.TK_PT_TiepNhan_DV_CTSV),
              parseInt(dataThongKe[0]?.TK_PT_TiepNhan_DV_HC),
            ]}
            options={{
              colors: ['#1a5cff', '#46c93a', '#ffba00', '#ff4757'],
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
              labels: [
                'Tài liệu học tập',
                'Việc làm',
                'Nhà ở',
                'Đồ dùng cá nhân',
              ],
              fill: {
                colors: ['#1a5cff', '#46c93a', '#ffba00', '#ff4757'],
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
              <span>Tài liệu học tập</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#46c93a'),
                })}
              />
              <span>Việc làm</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#ffba00'),
                })}
              />
              <span>Nhà ở</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#ff4757'),
                })}
              />
              <span>Đồ dùng cá nhân</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChartCSKNAll
