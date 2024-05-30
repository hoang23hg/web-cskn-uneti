import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(timezone)
dayjs.extend(utc)

export const compareDateTime = (dateTime1, dateTime2) => {
  let newDateTime1 = new Date(dateTime1)
  let newDateTime2 = new Date(dateTime2)

  if (newDateTime1 < newDateTime2) {
    return -1
  } else if (newDateTime1 === newDateTime2) {
    return 0
  } else {
    return 1
  }
}

export const compareDateWithoutTime = (dateTime1, dateTime2) => {
  let newDateTime1 = new Date(dateTime1)
  newDateTime1.setHours(0, 0, 0, 0)
  let newDateTime2 = new Date(dateTime2)
  newDateTime2.setHours(0, 0, 0, 0)

  if (newDateTime1 < newDateTime2) {
    return -1
  } else if (newDateTime1 === newDateTime2) {
    return 0
  } else {
    return 1
  }
}

export const calculateTimeDifference = (startTime) => {
  const start = dayjs(new Date(startTime)).utc().format('DD/MM/YYYY HH:mm')

  const end = dayjs()
    .utcOffset(7 * 60)
    .format('DD/MM/YYYY HH:mm') //UTC format VietNam

  const difference = Math.abs(new Date(end) - new Date(start))

  const minutes = Math.floor(difference / (1000 * 60))
  const hours = Math.floor(difference / (1000 * 60 * 60))
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))

  let result

  if (minutes < 60) {
    result = `${minutes} phút trước`
  } else if (hours < 24) {
    result = `${hours} giờ trước`
  } else if (days < 3) {
    result = `${days} ngày`
  } else {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    const currentYear = dayjs().year()
    const startYear = dayjs(start).year()

    if (currentYear === startYear) {
      result = start.toLocaleString('vi-VN', options)
    } else {
      options.year = 'numeric'
      result = start.toLocaleString('vi-VN', options)
    }
  }

  return result
}
