import React, { useEffect, useState } from "react";
// Services
import introService from "../services/introService";
// Components
import IntroSection from "../components/features/intro/IntroSection";
import { LoadingSpinner, ErrorMessage } from "../components/common";

const SECTION_SLUGS = {
  GENERAL: "gioi-thieu-chung",
  HISTORY: "lich-su-hinh-thanh",
  PHILOSOPHY: "gia-tri-triet-ly",
  COMMUNITY: "trach-nhiem-cong-dong",
};

export default function Intro() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntroData = async () => {
      setLoading(true);
      try {
        const data = await introService.getAll();
        setSections(data);
      } catch (err) {
        console.error("Lỗi tải trang giới thiệu:", err);
        setError("Không thể tải thông tin giới thiệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchIntroData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // Hàm tìm section theo slug
  const getSection = (slug) => sections.find((s) => s.slug === slug);

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 text-center mb-10 md:mb-16">
          Giới thiệu về Đông Dược Phúc Hưng
        </h1>

        {/* 1. Giới thiệu chung (Ảnh trái) */}
        <IntroSection section={getSection(SECTION_SLUGS.GENERAL)} layout="left" />

        {/* 2. Lịch sử hình thành (Ảnh phải) */}
        <IntroSection section={getSection(SECTION_SLUGS.HISTORY)} layout="right" />

        {/* 3. Giá trị - Triết lý (Không ảnh/Ảnh dưới) */}
        <IntroSection section={getSection(SECTION_SLUGS.PHILOSOPHY)} layout="none" />

        {/* 4. Trách nhiệm cộng đồng (Không ảnh/Ảnh dưới) */}
        <IntroSection section={getSection(SECTION_SLUGS.COMMUNITY)} layout="none" />
      </div>
    </main>
  );
}