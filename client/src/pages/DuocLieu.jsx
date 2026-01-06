import React, { useEffect, useState } from "react";
// Import Service
import materialService from "../services/materialService";
// Import Components
import HerbCard from "../components/features/herb/HerbCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/common";

export default function DuocLieu() {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHerbs = async () => {
      setLoading(true);
      try {
        // Gọi API lấy danh sách
        const data = await materialService.getAll();
        setHerbs(data);
      } catch (err) {
        console.error("Lỗi tải dữ liệu dược liệu:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchHerbs();
  }, []);

  // Render trạng thái
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-8 md:mb-10 text-center">
          Dược liệu quý
        </h1>

        {/* Grid Danh sách */}
        {herbs.length === 0 ? (
          <EmptyState message="Chưa có thông tin dược liệu nào." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {herbs.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}