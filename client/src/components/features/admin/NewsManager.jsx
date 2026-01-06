import React, { useState, useEffect } from 'react';
import newsService from '../../../services/newsService';
import { LoadingSpinner } from '../../common';

export default function NewsManager() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Load danh sách tin tức
  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await newsService.getAll();
      setNewsList(data);
    } catch (error) {
      console.error(error);
      alert("Lỗi tải danh sách tin tức");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  // Xử lý Submit (Thêm/Sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await newsService.update(editingId, formData);
        alert("Cập nhật tin tức thành công!");
      } else {
        await newsService.create(formData);
        alert("Thêm tin tức mới thành công!");
      }
      setFormData({});
      setEditingId(null);
      fetchNews();
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi lưu!");
    }
  };

  // Xử lý Xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa bài viết này?")) {
      try {
        await newsService.delete(id);
        fetchNews();
      } catch (error) {
        alert("Lỗi khi xóa!");
      }
    }
  };

  // Đổ dữ liệu vào form để sửa
  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* FORM NHẬP LIỆU */}
      <div className="bg-white p-6 rounded shadow h-fit">
        <h3 className="text-xl font-bold mb-4">{editingId ? 'Sửa Tin Tức' : 'Thêm Tin Tức'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
            <input 
              className="w-full border p-2 rounded" 
              required
              value={formData.title || ''} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input 
              className="w-full border p-2 rounded" 
              value={formData.slug || ''} 
              onChange={e => setFormData({...formData, slug: e.target.value})} 
              placeholder="tu-dong-tao-neu-trong"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
            <textarea 
              className="w-full border p-2 rounded" rows="2"
              value={formData.excerpt || ''} 
              onChange={e => setFormData({...formData, excerpt: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nội dung chi tiết *</label>
            <textarea 
              className="w-full border p-2 rounded" rows="5"
              required
              value={formData.content || ''} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Link ảnh</label>
            <input 
              className="w-full border p-2 rounded" 
              value={formData.image || ''} 
              onChange={e => setFormData({...formData, image: e.target.value})} 
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
              {editingId ? 'Lưu thay đổi' : 'Thêm mới'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({}); }} className="bg-gray-500 text-white px-4 py-2 rounded">
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* DANH SÁCH */}
      <div className="bg-white p-6 rounded shadow overflow-y-auto max-h-[800px]">
        <h3 className="text-xl font-bold mb-4">Danh sách tin tức ({newsList.length})</h3>
        {loading ? <LoadingSpinner /> : (
          <div className="space-y-3">
            {newsList.map(item => (
              <div key={item.id} className="border p-3 rounded hover:bg-gray-50 flex gap-3">
                {item.image && (
                  <div className="w-16 h-16 bg-gray-200 flex-shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover rounded" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-gray-800 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.slug}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">{item.excerpt}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm justify-center">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 font-medium">Sửa</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 font-medium">Xóa</button>
                </div>
              </div>
            ))}
            {newsList.length === 0 && <p className="text-gray-500 text-center">Chưa có bài viết nào.</p>}
          </div>
        )}
      </div>
    </div>
  );
}