import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryBreadcrumb({ categoryName }) {
  return (
    <nav className="text-sm text-gray-500 mb-4 flex items-center">
      <Link to="/" className="hover:text-red-700 hover:underline transition-colors">
        Trang chủ
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <span className="font-semibold text-gray-700">{categoryName}</span>
    </nav>
  );
}