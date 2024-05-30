import React from 'react'
import Skeleton from '@mui/material/Skeleton'

export const SkelotonPostItemCSKN = () => {
  return (
    <div className="flex flex-col p-2 bg-white rounded-md shadow-md">
      <div className="flex items-center gap-1">
        <Skeleton variant="circular" width={50} height={50} />
        <div className="flex flex-col">
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={200} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 my-2">
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="text" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="text" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="text" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="text" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="text" />
        </div>
        <div className="col-span-2">
          <Skeleton animation="wave" variant="rectangular" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="rounded" height={200} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="rounded" height={200} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="rounded" height={200} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Skeleton animation="wave" variant="rounded" height={200} />
        </div>
      </div>
    </div>
  )
}
