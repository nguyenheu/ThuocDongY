import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeIntro({ introSections }) {
  // Tìm section giới thiệu chung
  const generalIntro = introSections.find((s) => s.slug === "gioi-thieu-chung");
  
  // Danh sách các mục "Về chúng tôi"
  const aboutItems = [
    { slug: "lich-su-hinh-thanh", title: "Lịch sử hình thành" },
    { slug: "gia-tri-triet-ly", title: "Giá trị - Triết lý" },
    { slug: "trach-nhiem-cong-dong", title: "Trách nhiệm cộng đồng" },
  ];

  return (
    <>
      {/* Phần Giới thiệu chung + Video */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        {/* Cột trái: Text */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-red-700 text-white px-4 py-2 text-sm font-semibold rounded">
              GIỚI THIỆU
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {generalIntro?.image && (
              <div className="relative overflow-hidden rounded-lg group">
                <img
                  src={generalIntro.image}
                  alt="Intro"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-4">
                {generalIntro?.title || "Giới thiệu chung"}
              </h3>
              <p className="text-gray-700 leading-7 mb-4 line-clamp-4">
                {generalIntro?.content || "Nội dung đang cập nhật..."}
              </p>
              <Link to="/gioi-thieu" className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1">
                Xem tiếp &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Cột phải: Video (Giữ nguyên iframe mẫu) */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 md:p-6">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video intro"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-sm md:text-base text-gray-700 font-medium text-center">
            Video giới thiệu Đông Dược Phúc Hưng
          </p>
        </div>
      </section>

      {/* Phần 3 Cards bên dưới */}
      <section className="mb-12 md:mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">Về chúng tôi</h2>
          <div className="w-24 h-1 bg-red-700 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {aboutItems.map((item, idx) => {
            const section = introSections.find((s) => s.slug === item.slug);
            return (
              <Link
                key={idx}
                to="/gioi-thieu"
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {section?.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={section.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h4 className="text-xl font-bold text-red-700 mb-2 group-hover:text-red-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {section?.content || "Đang cập nhật..."}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}