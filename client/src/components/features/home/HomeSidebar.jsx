import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeSidebar({ products }) {
  return (
    <aside className="space-y-6">
      {/* Sản phẩm nổi bật */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-red-700">
          <h4 className="text-xl font-bold text-red-700">Sản phẩm nổi bật</h4>
          <Link to="/thuoc-dong-y" className="text-xs text-red-600 font-semibold hover:underline">Xem tất cả</Link>
        </div>
        <div className="space-y-4">
          {products.map((p) => (
            <Link key={p.id} to={`/thuoc-dong-y/${p.slug || p.id}`} className="block group">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="text-red-600 font-semibold text-sm line-clamp-2 group-hover:text-red-700">
                    {p.title || p.name}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tư vấn Online */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg overflow-hidden border-2 border-green-200 p-5">
        <div className="flex items-center gap-3 mb-4 border-b border-green-200 pb-3">
          <span className="text-2xl">👩‍⚕️</span>
          <h4 className="text-lg font-bold text-gray-800">Tư vấn online</h4>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="font-bold text-green-600 text-lg">1800 5454 35</p>
            <p className="text-xs text-gray-500">Miễn phí cước</p>
          </div>
        </div>
      </div>

      {/* Banner Cẩm nang */}
      <Link to="/cam-nang-suc-khoe" className="block bg-red-800 text-white rounded-xl shadow-lg p-6 text-center hover:bg-red-900 transition-colors">
        <span className="text-3xl">📚</span>
        <h4 className="font-bold text-lg mt-2">Cẩm Nang Sức Khỏe</h4>
      </Link>
    </aside>
  );
}