import React, { useState, useEffect } from 'react';
import dharmaService from '../../../services/pharmaService';
import { LoadingSpinner } from '../../common';

export default function DongYManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Load danh sách
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await dharmaService.getAll();
      setItems(data);
    } catch (error) {
      console.error(error);
      alert("Lỗi tải dữ liệu Đông Y & Phật Pháp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await dharmaService.update(editingId, formData);
        alert("Cập nhật thành công!");
      } else {
        await dharmaService.create(formData);
        alert("Thêm mới thành công!");
      }
      setFormData({});
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa bài viết này?")) {
      try {
        await dharmaService.delete(id);
        fetchData();
      } catch (error) {
        alert("Lỗi khi xóa!");
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* FORM */}
      <div className="bg-white p-6 rounded shadow h-fit">
        <h3 className="text-xl font-bold mb-4">{editingId ? 'Sửa Bài Viết' : 'Thêm Bài Viết (Đông Y)'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
            <input 
              className="w-full border p-2 rounded" required
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
            <label className="block text-sm font-medium mb-1">Nội dung *</label>
            <textarea 
              className="w-full border p-2 rounded" rows="5" required
              value={formData.content || ''} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hình ảnh</label>
            <input 
              className="w-full border p-2 rounded" 
              value={formData.image || ''} 
              onChange={e => setFormData({...formData, image: e.target.value})} 
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
              {editingId ? 'Lưu' : 'Thêm'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({}); }} className="bg-gray-500 text-white px-4 py-2 rounded">
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded shadow overflow-y-auto max-h-[800px]">
        <h3 className="text-xl font-bold mb-4">Danh sách ({items.length})</h3>
        {loading ? <LoadingSpinner /> : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="border p-3 rounded hover:bg-gray-50 flex gap-3">
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.slug}</p>
                </div>
                <div className="flex gap-2 text-sm">
                  <button onClick={() => {setFormData(item); setEditingId(item.id)}} className="text-blue-600">Sửa</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600">Xóa</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}