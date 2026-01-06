import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroBanner({ banner }) {
  if (!banner) return null;

  return (
    <section className="relative mb-8 md:mb-12">
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={banner.image || "/images/hero-siro.jpg"}
          alt={banner.title || "Banner"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        {banner.title && (
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full text-white">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {banner.title}
                </h1>
                {banner.description && (
                  <p className="text-lg md:text-xl text-gray-100 mb-6">
                    {banner.description}
                  </p>
                )}
                <Link
                  to="/thuoc-dong-y"
                  className="inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                >
                  Xem sản phẩm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}