import React, { useState, useEffect } from 'react'
import { put_DangBan_BaoCao } from '@/Apis/ChiaSevaKetNoi/apiQuanTri'
import Swal from 'sweetalert2'
function ReportedPosts() {
  const [reportedPosts, setReportedPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)

  useEffect(() => {
    fetchReportedPosts()
  }, [])

  const fetchReportedPosts = async () => {
    try {
      const response = await fetch('/api/getReportedPosts')
      const data = await response.json()
      setReportedPosts(data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài viết bị báo cáo:', error)
      Swal.fire({
        title: 'Lỗi!',
        text: 'Đã có lỗi xảy ra khi lấy danh sách bài viết bị báo cáo!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const handleReportPost = async (postId, tenBang, noiDungBaoCao) => {
    try {
      await put_DangBan_BaoCao({
        Dang_BaoCao_IDBaoCao: 1, 
        Dang_BaoCao_IDNguoiDung: 1,
        Dang_BaoCao_TenBang: tenBang,
        Dang_BaoCao_IDBaiViet: postId,
        Dang_BaoCao_NoiDung: noiDungBaoCao,
      })
      fetchReportedPosts() // Cập nhật danh sách bài viết sau khi báo cáo
    } catch (error) {
      console.error('Lỗi khi báo cáo bài viết:', error)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedSubCategory(null) // Reset subcategory when changing category
  }

  const handleSubCategoryChange = (subcategory) => {
    setSelectedSubCategory(subcategory)
  }

  return (
    <div className="col-span-12">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-xl text-uneti-primary underline">
          Bài viết bị báo cáo
        </h2>
        <div className="mb-4">
          <label className="font-semibold mr-2">Chọn phân mục:</label>
          <select
            className="border rounded p-1 mr-4"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory}
          >
            <option value="">Tất cả</option>
            <option value="Tài liệu học tập">Tài liệu học tập</option>
            <option value="Đồ dùng cá nhân">Đồ dùng cá nhân</option>
            <option value="Nhà ở">Nhà ở</option>
            <option value="Việc làm">Việc làm</option>
          </select>
          {selectedCategory === 'Tài liệu học tập' && (
            <select
              className="border rounded p-1"
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              value={selectedSubCategory}
            >
              <option value="">Tất cả</option>
              <option value="Đăng bài">Đăng bài</option>
              <option value="Đăng bán">Đăng bán</option>
            </select>
          )}
          {selectedCategory === 'Đồ dùng cá nhân' && (
            <select
              className="border rounded p-1"
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              value={selectedSubCategory}
            >
              <option value="">Tất cả</option>
              <option value="Đăng bài">Đăng bài</option>
              <option value="Đăng bán">Đăng bán</option>
            </select>
          )}
          {selectedCategory === 'Nhà ở' && (
            <select
              className="border rounded p-1"
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              value={selectedSubCategory}
            >
              <option value="">Tất cả</option>
              <option value="Cho thuê">Cho thuê</option>
              <option value="Tìm trọ">Tìm trọ</option>
            </select>
          )}
          {selectedCategory === 'Việc làm' && (
            <select
              className="border rounded p-1"
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              value={selectedSubCategory}
            >
              <option value="">Tất cả</option>
              <option value="Tuyển dụng">Tuyển dụng</option>
            </select>
          )}
        </div>
        <table className="min-w-full divide-y divide-gray-200">
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
            {reportedPosts.map((post) => (
              ((selectedCategory === null || post.TenBang === selectedCategory) &&
               (selectedSubCategory === null || post.Loai === selectedSubCategory)) && (
                <tr key={post.IDBaiDang}>
                  <td className="px-6 py-4 whitespace-nowrap">{post.IDBaiDang}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.TieuDe}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.TenBang}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleReportPost(post.IDBaiDang, post.TenBang, 'Nội dung báo cáo')}
                    >
                      Báo Cáo
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportedPosts
