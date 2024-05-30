import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { LuChevronUp } from 'react-icons/lu'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Hàm được gọi khi người dùng cuộn
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Gắn sự kiện cho cửa sổ khi thành phần được mount
    window.addEventListener('scroll', toggleVisibility)

    // Xóa sự kiện khi thành phần bị unmount để tránh memory leak
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className={clsx(isVisible && 'sticky bottom-10 float-right right-10')}>
      <div
        onClick={scrollToTop}
        className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-uneti-primary/60 text-white border border-slate-200 hover:opacity-80"
      >
        <LuChevronUp size={32} />
      </div>
    </div>
  )
}

export default BackToTop
