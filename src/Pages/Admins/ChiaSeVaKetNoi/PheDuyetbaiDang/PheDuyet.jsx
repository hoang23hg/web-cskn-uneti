import React, { useState, useEffect } from 'react'
import { put_DangBaiEdit_ShowCheck } from '@/Apis/ChiaSevaKetNoi/apiQuanTri'
import Swal from 'sweetalert2'


function PendingPosts() {
  const [pendingPosts, setPendingPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Tài liệu học tập')
  const [selectedSubCategory, setSelectedSubCategory] = useState('Đăng Bài')

  useEffect(() => {
    fetchPendingPosts()
  }, [])

  const fetchPendingPosts = async () => {
    try {
      const response = await fetch('/api/getPendingPosts')
      const data = await response.json()
      setPendingPosts(data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài viết chờ phê duyệt:', error)
      Swal.fire({
        title: 'Lỗi!',
        text: 'Đã có lỗi xảy ra khi lấy danh sách bài viết!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const handleApprovePost = async (postId, tenBang) => {
    try {
      await put_DangBaiEdit_ShowCheck({ IDBaiDang: postId, TenBang: tenBang, Show: 1, Check: 1 })
      fetchPendingPosts() // Cập nhật danh sách bài viết sau khi phê duyệt
    } catch (error) {
      console.error('Lỗi khi phê duyệt bài viết:', error)
      Swal.fire({
        title: 'Lỗi!',
        text: 'Đã có lỗi xảy ra khi phê duyệt bài viết!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const handleRejectPost = async (postId, tenBang) => {
    try {
      await put_DangBaiEdit_ShowCheck({ IDBaiDang: postId, TenBang: tenBang, Show: 0, Check: 0 })
      fetchPendingPosts() // Cập nhật danh sách bài viết sau khi từ chối
    } catch (error) {
      console.error('Lỗi khi từ chối bài viết:', error)
      Swal.fire({
        title: 'Lỗi!',
        text: 'Đã có lỗi xảy ra khi từ chối bài viết!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const categories = {
    "Tài liệu học tập": {
      "Đăng Bài": pendingPosts.filter(post => post.TenBang === "Tài liệu học tập" && post.Loai === "Đăng Bài"),
      "Đăng Bán": pendingPosts.filter(post => post.TenBang === "Tài liệu học tập" && post.Loai === "Đăng Bán")
    },
    "Đồ dùng cá nhân": {
      "Đăng Bài": pendingPosts.filter(post => post.TenBang === "Đồ dùng cá nhân" && post.Loai === "Đăng Bài"),
      "Đăng Bán": pendingPosts.filter(post => post.TenBang === "Đồ dùng cá nhân" && post.Loai === "Đăng Bán")
    },
    "Nhà ở": {
      "Cho thuê": pendingPosts.filter(post => post.TenBang === "Nhà ở" && post.Loai === "Cho thuê"),
      "Tìm trọ": pendingPosts.filter(post => post.TenBang === "Nhà ở" && post.Loai === "Tìm trọ")
    },
    "Việc làm": {
      "Tuyển dụng": pendingPosts.filter(post => post.TenBang === "Việc làm" && post.Loai === "Tuyển dụng")
    }
  }

  return (
    <div className="col-span-12">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-xl text-uneti-primary underline mb-4">
          Bài viết chờ phê duyệt
        </h2>
        
        {/* Dropdown để chọn phân mục */}
        <div className="mb-4">
          <label htmlFor="category" className="mr-2 font-semibold">Chọn phân mục:</label>
          <select 
            id="category" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mr-4"
          >
            {Object.keys(categories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Dropdown để chọn phân mục con */}
          {selectedCategory && categories[selectedCategory] && (
            <select 
              id="subCategory" 
              value={selectedSubCategory} 
              onChange={(e) => setSelectedSubCategory(e.target.value)}
            >
              {Object.keys(categories[selectedCategory]).map(subCategory => (
                <option key={subCategory} value={subCategory}>{subCategory}</option>
              ))}
            </select>
          )}
        </div>

        {/* Hiển thị bài viết chờ phê duyệt cho phân mục đã chọn */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-2">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Bài Đăng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu Đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên Bảng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories[selectedCategory] && categories[selectedCategory][selectedSubCategory] && categories[selectedCategory][selectedSubCategory].map(post => (
                <tr key={post.IDBaiDang}>
                  <td className="px-6 py-4 whitespace-nowrap">{post.IDBaiDang}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.TieuDe}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.TenBang}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleApprovePost(post.IDBaiDang, post.TenBang)}
                    >
                      Duyệt Bài Viết
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleRejectPost(post.IDBaiDang, post.TenBang)}
                    >
                      Từ Chối Bài Viết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PendingPosts
