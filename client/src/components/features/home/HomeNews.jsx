import React from 'react';
import { Link } from 'react-router-dom';

function NewsItem({ item, isLast }) {
  const date = item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : '';

  return (
    <Link to={`/tin-tuc/${item.slug || item.id}`} className="block group hover:bg-gray-50 p-4 rounded-lg transition-colors">
      <div className="flex flex-col md:flex-row gap-4">
        {item.image && (
          <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-2">{date}</div>
          <h4 className="text-lg font-bold text-red-700 mb-2 group-hover:text-red-800 line-clamp-2">
            {item.title}
          </h4>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.excerpt}</p>
          <span className="text-red-600 text-sm font-medium">Đọc tiếp &rarr;</span>
        </div>
      </div>
      {!isLast && <div className="mt-4 border-b border-gray-200"></div>}
    </Link>
  );
}

export default function HomeNews({ news }) {
  return (
    <div className="space-y-6">
      {/* Box Tin tức */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-red-700">Tin tức mới nhất</h3>
          <Link to="/tin-tuc" className="text-red-600 hover:text-red-700 text-sm font-semibold">
            Xem tất cả &rarr;
          </Link>
        </div>
        <div className="space-y-2">
          {news.map((item, index) => (
            <NewsItem key={item.id} item={item} isLast={index === news.length - 1} />
          ))}
        </div>
      </div>

      {/* Box Quảng cáo */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4">
        <div className="h-48 bg-gradient-to-r from-red-700 via-red-600 to-yellow-500 rounded-lg flex items-center justify-center text-white shadow-md">
          <div className="text-center">
            <p className="text-xl font-bold">Quảng cáo - Banner</p>
            <p className="text-sm mt-2">Liên hệ: 1800 5454 35</p>
          </div>
        </div>
      </div>
    </div>
  );
}