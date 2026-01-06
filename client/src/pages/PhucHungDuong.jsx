import React from "react";
// Import Components
import ClinicIntro from "../components/features/phucHungDuong/ClinicIntro";
import ContactSection from "../components/features/phucHungDuong/ContactSection";

export default function PhucHungDuong() {
  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 text-center mb-10 md:mb-16">
          Phúc Hưng Đường
        </h1>

        {/* 1. Phần giới thiệu */}
        <ClinicIntro />

        {/* 2. Phần liên hệ & Map */}
        <ContactSection />
      </div>
    </main>
  );
}