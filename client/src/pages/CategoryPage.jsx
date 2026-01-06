import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import Services
import categoryService from "../services/categoryService";
import productService from "../services/productService";

// Import Components
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/common";
import ProductCard from "../components/common/ProductCard";
import CategoryBreadcrumb from "../components/features/category/CategoryBreadcrumb";
import CategoryHeader from "../components/features/category/CategoryHeader";

export default function CategoryPage() {
  const { slug } = useParams(); // Lấy slug từ URL

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Lấy thông tin danh mục dựa trên slug
        const categoryData = await categoryService.getBySlug(slug);
        
        if (!categoryData) {
          throw new Error("Không tìm thấy danh mục này.");
        }
        setCategory(categoryData);

        // 2. Lấy sản phẩm thuộc danh mục đó (dựa vào ID vừa lấy được)
        // Giả sử API getByCategoryId nhận category_id
        const productsData = await productService.getByCategoryId(categoryData.id);
        setProducts(productsData);

      } catch (err) {
        console.error("Lỗi tải trang danh mục:", err);
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // Render các trạng thái
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!category) return <EmptyState message="Không tìm thấy danh mục yêu cầu." />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb & Header */}
        <CategoryBreadcrumb categoryName={category.name} />
        <CategoryHeader category={category} />

        {/* Grid Sản phẩm */}
        {products.length === 0 ? (
          <EmptyState message="Chưa có sản phẩm nào trong danh mục này." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}