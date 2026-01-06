import React, { useEffect, useState } from "react";
// Import Services
import newsService from "../services/newsService";
// Import Components
import NewsCard from "../components/features/news/NewsCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/common";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      try {
        // Gọi API qua Service
        const data = await newsService.getAll();
        setNews(data);
      } catch (err) {
        console.error("Lỗi tải tin tức:", err);
        setError("Không thể tải tin tức. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Render các trạng thái Loading/Error
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header trang */}
        <h1 className="text-4xl md:text-5xl font-bold text-re d-700 text-center mb-10 md:mb-16">
          Tin tức mới nhất
        </h1>

        {/* Grid hiển thị danh sách */}
        {news.length === 0 ? (
          <EmptyState message="Chưa có tin tức nào." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}