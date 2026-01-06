import React, { useEffect, useState } from "react";
// Import Service
import dharmaService from "../services/pharmaService";
// Import Components
import DharmaCard from "../components/features/pharma/PharmaCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/common";

export default function DongYPhatPhap() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Gọi API lấy danh sách
        const data = await dharmaService.getAll();
        setItems(data);
      } catch (err) {
        console.error("Lỗi tải dữ liệu Đông y & Phật pháp:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render trạng thái
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-8 md:mb-10 text-center">
          Đông y & Phật pháp
        </h1>

        {/* Grid Danh sách */}
        {items.length === 0 ? (
          <EmptyState message="Chưa có bài viết nào trong mục này." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
              <DharmaCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}