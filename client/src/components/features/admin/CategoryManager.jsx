import React, { useState, useEffect } from 'react';
import categoryService from '../../../services/categoryService';
import { LoadingSpinner } from '../../common';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Load data
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      alert("Lỗi tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  // Xử lý Submit (Thêm hoặc Sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await categoryService.update(editingId, formData);
        alert("Cập nhật thành công!");
      } else {
        await categoryService.create(formData);
        alert("Thêm mới thành công!");
      }
      setFormData({});
      setEditingId(null);
      fetchCategories(); // Reload list
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  // Xử lý Xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      try {
        await categoryService.delete(id);
        fetchCategories();
      } catch (error) {
        alert("Lỗi khi xóa!");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* FORM */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">{editingId ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tên danh mục</label>
            <input 
              className="w-full border p-2 rounded" 
              value={formData.name || ''} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input 
              className="w-full border p-2 rounded" 
              value={formData.slug || ''} 
              onChange={e => setFormData({...formData, slug: e.target.value})} 
            />
          </div>
          <div className="flex gap-2">
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

      {/* LIST */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Danh sách danh mục</h3>
        {loading ? <LoadingSpinner /> : (
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat.id} className="flex justify-between items-center border p-2 rounded hover:bg-gray-50">
                <div>
                  <p className="font-semibold">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.slug}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(cat)} className="text-blue-600 text-sm">Sửa</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 text-sm">Xóa</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}