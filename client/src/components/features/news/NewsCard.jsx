import React from 'react';
import { Link } from 'react-router-dom';

export default function NewsCard({ item }) {
  // Hàm format ngày tháng (có thể đưa vào folder utils sau này)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const link = `/tin-tuc/${item.slug || item.id}`;
  const publishDate = formatDate(item.createdAt || item.date);

  return (
    <Link
      to={link}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block h-full flex flex-col"
    >
      {/* Hình ảnh */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Nội dung */}
      <div className="p-6 flex flex-col flex-1">
        {/* Ngày đăng */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>📅 {publishDate}</span>
        </div>

        {/* Tiêu đề */}
        <h3 className="text-xl font-bold text-red-700 mb-3 group-hover:text-red-800 transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Mô tả ngắn */}
        <p className="text-gray-600 text-sm leading-6 line-clamp-3 mb-4 flex-1">
          {item.excerpt}
        </p>

        {/* Nút Đọc tiếp */}
        <div className="flex items-center text-red-600 text-sm font-medium group-hover:text-red-700 transition-colors mt-auto">
          <span>Đọc tiếp</span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}