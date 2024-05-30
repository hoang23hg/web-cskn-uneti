import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { homeChiaSeVaKetNoi } from '@/Services/Static/dataStatic'
import React from 'react'

function ChiaSeVaKetNoi() {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      {homeChiaSeVaKetNoi.map((item, index) => {
        return (
          <div className="col-span-2 md:col-span-1" key={index}>
            <ModuleItem item={item} />
          </div>
        )
      })}
    </div>
  )
}

export default ChiaSeVaKetNoi
