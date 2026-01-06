import React from 'react';
import { Link } from 'react-router-dom';

export default function RemedyCard({ item }) {
  // Đường dẫn chi tiết bài thuốc
  const link = `/bai-thuoc-dong-y/${item.slug || item.id}`;

  return (
    <Link
      to={link}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 block h-full flex flex-col"
    >
      {/* Hình ảnh */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Nội dung */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-red-700 mb-3 group-hover:text-red-800 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm leading-6 line-clamp-3 mb-4 flex-1">
          {item.excerpt}
        </p>
        <span className="text-red-600 text-sm mt-auto inline-block font-medium group-hover:text-red-700 transition-colors">
          Xem tiếp...
        </span>
      </div>
    </Link>
  );
}