import React, { useEffect, useState } from "react";
// Import Service (Đảm bảo bạn đã tạo file này ở các bước trước)
import remedyService from "../services/remedyService";
// Import Components
import RemedyCard from "../components/features/remedy/RemedyCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/common";

export default function BaiThuoc() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRemedies = async () => {
      setLoading(true);
      try {
        // Gọi API lấy danh sách bài thuốc
        const data = await remedyService.getAll();
        setItems(data);
      } catch (err) {
        console.error("Lỗi tải bài thuốc:", err);
        setError("Không thể tải dữ liệu bài thuốc. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchRemedies();
  }, []);

  // Render các trạng thái
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Tiêu đề trang */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-8 md:mb-10 text-center">
          Bài thuốc Đông y
        </h1>

        {/* Danh sách bài thuốc */}
        {items.length === 0 ? (
          <EmptyState message="Hiện chưa có bài thuốc nào." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
              <RemedyCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}