import React from 'react';

// Dữ liệu tĩnh cho danh mục (Mock Data)
const CATEGORIES = [
  { id: 1, name: "Thuốc ho" },
  { id: 2, name: "Tiêu hóa" },
  { id: 3, name: "Tim mạch" },
  { id: 4, name: "Hô hấp" },
  { id: 5, name: "Xương khớp" },
  { id: 6, name: "Thần kinh" },
];

export default function HomeCategory() {
  return (
    <section className="mb-12 md:mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">Danh mục sản phẩm</h2>
        <div className="w-24 h-1 bg-red-700 mx-auto"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center justify-center text-center cursor-pointer min-h-[100px]"
          >
            <h3 className="text-lg font-bold text-red-700">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}