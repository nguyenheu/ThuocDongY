import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // Xử lý các trường dữ liệu có thể khác nhau (title/name, description/excerpt)
  const title = product.title || product.name;
  const description = product.excerpt || product.description || "";
  const link = `/thuoc-dong-y/${product.slug || product.id}`;

  return (
    <Link
      to={link}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 block h-full flex flex-col"
    >
      {/* Hình ảnh */}
      <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        {product.image ? (
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {/* Badge Nổi bật (nếu có) */}
        {product.featured && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
            Nổi bật
          </span>
        )}
      </div>

      {/* Nội dung */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-red-700 font-semibold text-lg mb-2 group-hover:text-red-800 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {description}
        </p>
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-red-600 text-sm font-medium group-hover:underline">
            Xem chi tiết
          </span>
          <svg className="w-4 h-4 text-red-600 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}