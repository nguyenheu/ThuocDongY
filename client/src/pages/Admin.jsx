import React, { useState } from "react";

import CategoryManager from "../components/features/admin/CategoryManager";
import ProductManager from "../components/features/admin/ProductManager";
import NewsManager from "../components/features/admin/NewsManager";
import DongYManager from "../components/features/admin/DongYManager";

// các Tab
const TABS = {
  CATEGORIES: "categories",
  PRODUCTS: "products",
  NEWS: "news",
  DONG_Y: "dongYPhatPhap",
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState(TABS.CATEGORIES);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.CATEGORIES:
        return <CategoryManager />;
      case TABS.PRODUCTS:
        return <ProductManager />;
      case TABS.NEWS:
         return <NewsManager />;
      case TABS.DONG_Y:
         return <DongYManager />;
      default:
        return <div>Chọn một tab để quản lý</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Hệ Thống Quản Trị
        </h1>

        {/* Menu Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded shadow-sm">
          <TabButton 
            isActive={activeTab === TABS.CATEGORIES} 
            onClick={() => setActiveTab(TABS.CATEGORIES)}
          >
            📂 Danh mục
          </TabButton>
          <TabButton 
            isActive={activeTab === TABS.PRODUCTS} 
            onClick={() => setActiveTab(TABS.PRODUCTS)}
          >
            💊 Sản phẩm
          </TabButton>
          <TabButton 
            isActive={activeTab === TABS.NEWS} 
            onClick={() => setActiveTab(TABS.NEWS)}
          >
            📰 Tin tức
          </TabButton>
          <TabButton 
            isActive={activeTab === TABS.DONG_Y} 
            onClick={() => setActiveTab(TABS.DONG_Y)}
          >
            🙏 Đông Y & Phật Pháp
          </TabButton>
        </div>

        {/* Nội dung chính (Dynamic Content) */}
        <div className="min-h-[500px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Component nút bấm (Tab)
function TabButton({ isActive, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold transition-all rounded ${
        isActive
          ? "bg-red-700 text-white shadow-md transform scale-105"
          : "text-gray-600 hover:bg-gray-100 hover:text-red-700"
      }`}
    >
      {children}
    </button>
  );
}