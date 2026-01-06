import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

// ============== CONSTANTS ==============
const BRAND_INFO = {
  LOGO: "P/H",
  SLOGAN: "Thuốc Nam của người Việt",
  NAME: "PHUC HUNG",
};

const NAVIGATION_ITEMS = [
  { to: "/", label: "TRANG CHỦ" },
  { to: "/gioi-thieu", label: "GIỚI THIỆU" },
  { to: "/tin-tuc", label: "TIN TỨC" },
  { to: "/thuoc-dong-y", label: "THUỐC ĐÔNG Y" },
  { to: "/phuc-hung-duong", label: "PHÚC HƯNG ĐƯỜNG" },
  { to: "/cam-nang-suc-khoe", label: "CẨM NANG SỨC KHỎE" },
  { to: "/bai-thuoc-dong-y", label: "BÀI THUỐC ĐÔNG Y" },
  { to: "/duoc-lieu-quy", label: "DƯỢC LIỆU QUÝ" },
  { to: "/dong-y-phat-phap", label: "ĐÔNG Y & PHẬT PHÁP" },
];

// ============== SUB COMPONENTS ==============

/**
 * Logo - Component hiển thị logo và thương hiệu
 */
function Logo() {
  return (
    <div className="flex items-center gap-6">
      {/* Logo box */}
      <div className="w-16 h-16 bg-white rounded-lg shadow flex items-center justify-center flex-shrink-0">
        <span className="text-red-700 font-bold text-xl tracking-tight">
          {BRAND_INFO.LOGO}
        </span>
      </div>

      {/* Brand text */}
      <div className="flex flex-col">
        <span
          className="text-3xl text-red-600 font-bold italic"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          {BRAND_INFO.SLOGAN}
        </span>
        <span className="text-sm text-red-700 font-semibold">
          {BRAND_INFO.NAME}
        </span>
      </div>
    </div>
  );
}

/**
 * TopHeader - Phần header trên cùng với logo và thương hiệu
 */
function TopHeader() {
  return (
    <div className="bg-[#fff5eb] relative z-10 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
      </div>
    </div>
  );
}

/**
 * NavItem - Component cho mỗi mục điều hướng
 */
function NavItem({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `whitespace-nowrap transition-colors duration-200 ${
            isActive
              ? "text-yellow-200 font-semibold"
              : "text-white hover:text-gray-200"
          }`
        }
        end={to === "/"}
      >
        {label}
      </NavLink>
    </li>
  );
}

/**
 * NavBar - Thanh điều hướng chính
 */
function NavBar() {
  const navItems = useMemo(() => NAVIGATION_ITEMS, []);

  return (
    <nav className="bg-red-700 border-t border-red-800 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-wrap justify-center text-[13px] py-2 gap-x-6">
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to} label={item.label} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ============== MAIN COMPONENT ==============

/**
 * Header - Component header chính hiển thị logo, thương hiệu và điều hướng
 */
export default function Header() {
  return (
    <header className="relative">
      <TopHeader />
      <NavBar />
    </header>
  );
}