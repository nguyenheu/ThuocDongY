import React from 'react';
import { Link } from 'react-router-dom';

export default function HerbCard({ herb }) {
  // Đường dẫn chi tiết (Lưu ý: giữ đúng prefix '/duoc-lieu-quy/' như code cũ)
  const link = `/duoc-lieu-quy/${herb.slug || herb.id}`;

  return (
    <Link
      to={link}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 block h-full flex flex-col"
    >
      {/* Hình ảnh */}
      <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        {herb.image ? (
          <img
            src={herb.image}
            alt={herb.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Nội dung */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-red-700 font-semibold text-lg mb-2 group-hover:text-red-800 transition-colors line-clamp-2">
          {herb.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 flex-1 mb-4">
          {herb.excerpt}
        </p>
        <span className="text-red-600 text-sm mt-auto inline-block font-medium group-hover:text-red-700 transition-colors">
          Xem tiếp...
        </span>
      </div>
    </Link>
  );
}