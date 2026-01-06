import React, { useEffect, useState } from "react";
// Import Service
import productService from "../services/productService";
// Import Components
import ProductCard from "../components/common/ProductCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/common";

export default function DongY() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Gọi API lấy tất cả sản phẩm
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
        setError("Không thể tải danh sách thuốc. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Render trạng thái
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-8 md:mb-10 text-center">
          Thuốc Đông y
        </h1>

        {/* Grid Sản phẩm */}
        {products.length === 0 ? (
          <EmptyState message="Chưa có sản phẩm thuốc nào." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}