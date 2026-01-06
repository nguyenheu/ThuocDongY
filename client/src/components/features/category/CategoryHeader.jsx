import React from 'react';

export default function CategoryHeader({ category }) {
  if (!category) return null;

  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4 relative inline-block">
        {category.name}
        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-700 rounded-full"></span>
      </h1>
      {category.description && (
        <p className="text-gray-600 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      )}
    </div>
  );
}