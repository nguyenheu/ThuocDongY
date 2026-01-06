import React, { useEffect, useState } from "react";
// Import Components
import HeroBanner from "../components/features/home/HeroBanner";
import HomeIntro from "../components/features/home/HomeIntro";
import HomeCategory from "../components/features/home/HomeCategory";
import HomeNews from "../components/features/home/HomeNews";
import HomeSidebar from "../components/features/home/HomeSidebar";
import MarqueeSection from "../components/features/home/MarqueeSection";
import { LoadingSpinner } from "../components/common";

// Import Services
import bannerService from "../services/bannerService";
import productService from "../services/productService";
import introService from "../services/introService";
import newsService from "../services/newsService";

export default function Home() {
  const [data, setData] = useState({
    banners: [],
    introSections: [],
    featuredProducts: [],
    news: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Gọi song song các API để tiết kiệm thời gian
        const [banners, intro, products, news] = await Promise.all([
          bannerService.getAll(),
          introService.getAll(),
          productService.getFeatured(),
          newsService.getLatest(3),
        ]);

        setData({
          banners: banners || [],
          introSections: intro || [],
          featuredProducts: products || [],
          news: news || [],
        });
      } catch (error) {
        console.error("Lỗi tải trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      {/* 1. Banner chính */}
      <HeroBanner banner={data.banners[0]} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 2. Giới thiệu & Danh mục */}
        <HomeIntro introSections={data.introSections} />
        <HomeCategory />

        {/* 3. Layout chính: Tin tức + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cột chính (Tin tức) */}
          <div className="lg:col-span-2">
            <HomeNews news={data.news} />
          </div>

          {/* Cột phụ (Sidebar) */}
          <HomeSidebar products={data.featuredProducts} />
        </section>
      </div>

      {/* 4. Chữ chạy chân trang */}
      <MarqueeSection />
    </main>
  );
}