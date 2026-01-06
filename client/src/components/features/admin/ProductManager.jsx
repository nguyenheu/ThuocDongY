import React, { useState, useEffect } from 'react';
import productService from '../../../services/productService';
import categoryService from '../../../services/categoryService'; // Cần cái này để chọn danh mục
import { LoadingSpinner } from '../../common';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Load cả Products và Categories
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      setProducts(prodRes);
      setCategories(catRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productService.update(editingId, formData);
        alert("Đã cập nhật sản phẩm!");
      } else {
        await productService.create(formData);
        alert("Đã thêm sản phẩm!");
      }
      setFormData({});
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert("Lỗi khi lưu sản phẩm");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Xóa sản phẩm này?")) {
      await productService.delete(id);
      fetchData();
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* FORM SẢN PHẨM */}
      <div className="bg-white p-6 rounded shadow h-fit">
        <h3 className="text-xl font-bold mb-4">{editingId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Tên sản phẩm *" 
            value={formData.name || ''} 
            onChange={e => setFormData({...formData, name: e.target.value})} required 
          />
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Slug (URL)" 
            value={formData.slug || ''} 
            onChange={e => setFormData({...formData, slug: e.target.value})} 
          />
          <select 
            className="w-full border p-2 rounded"
            value={formData.category_id || ''}
            onChange={e => setFormData({...formData, category_id: e.target.value})}
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          
          <textarea 
            className="w-full border p-2 rounded" rows="3" 
            placeholder="Mô tả ngắn"
            value={formData.description || ''}
            onChange={e => setFormData({...formData, description: e.target.value})}
          ></textarea>

          <input 
             className="w-full border p-2 rounded" 
             placeholder="Link ảnh (URL)" 
             value={formData.image || ''} 
             onChange={e => setFormData({...formData, image: e.target.value})} 
          />

          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={formData.featured || false} 
              onChange={e => setFormData({...formData, featured: e.target.checked})} 
            />
            <span>Sản phẩm nổi bật</span>
          </label>

          <div className="flex gap-2">
             <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded">Lưu</button>
             {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({})}} className="bg-gray-500 text-white px-4 py-2 rounded">Hủy</button>}
          </div>
        </form>
      </div>

      {/* DANH SÁCH SẢN PHẨM */}
      <div className="bg-white p-6 rounded shadow overflow-y-auto max-h-[800px]">
        <h3 className="text-xl font-bold mb-4">Danh sách ({products.length})</h3>
        {loading ? <LoadingSpinner /> : (
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="border p-3 rounded hover:bg-gray-50 flex gap-3">
                <div className="w-16 h-16 bg-gray-200 flex-shrink-0">
                    {p.image && <img src={p.image} className="w-full h-full object-cover" alt="" />}
                </div>
                <div className="flex-1">
                    <p className="font-bold text-red-700">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.category_name || 'Chưa phân loại'}</p>
                    {p.featured && <span className="text-[10px] bg-yellow-200 px-1 rounded">Nổi bật</span>}
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <button onClick={() => {setFormData(p); setEditingId(p.id)}} className="text-blue-600">Sửa</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600">Xóa</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}