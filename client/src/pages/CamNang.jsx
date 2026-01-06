import React, { useEffect, useState } from "react";
// Import Service
import camNangService from "../services/camNangService";
// Import Components
import GuideCard from "../components/features/guide/GuideCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/common";

export default function CamNang() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      try {
        const data = await camNangService.getAll();
        setItems(data);
      } catch (err) {
        console.error("Lỗi tải dữ liệu Cẩm nang:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Render trạng thái
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-8 md:mb-10 text-center">
          Cẩm nang sức khỏe
        </h1>

        {/* Grid Danh sách */}
        {items.length === 0 ? (
          <EmptyState message="Chưa có bài viết nào trong mục này." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
              <GuideCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}