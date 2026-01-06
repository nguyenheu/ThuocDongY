import React from "react";
import { Routes, Route } from "react-router-dom";

// === UPDATE: Import Components từ folder layout ===
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SidebarChat from "./components/layout/SidebarChat";

// === Import Pages ===
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import News from "./pages/News";
import DongY from "./pages/DongY";
import PhucHungDuong from "./pages/PhucHungDuong";
import CamNang from "./pages/CamNang";
import BaiThuoc from "./pages/BaiThuoc";
import DuocLieu from "./pages/DuocLieu";
import DongYPhatPhap from "./pages/DongYPhatPhap";
import Admin from "./pages/Admin";
import CategoryPage from "./pages/CategoryPage";

// Import Global CSS
import "./index.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<Intro />} />
          <Route path="/tin-tuc" element={<News />} />
          <Route path="/thuoc-dong-y" element={<DongY />} />
          <Route path="/phuc-hung-duong" element={<PhucHungDuong />} />
          <Route path="/cam-nang-suc-khoe" element={<CamNang />} />
          <Route path="/bai-thuoc-dong-y" element={<BaiThuoc />} />
          <Route path="/duoc-lieu-quy" element={<DuocLieu />} />
          <Route path="/dong-y-phat-phap" element={<DongYPhatPhap />} />
          
          {/* Routes cho Admin & Danh mục */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/danh-muc/:slug" element={<CategoryPage />} />

          {/* NOTE: Sau này bạn cần thêm các route chi tiết (Detail Page) ở đây 
             Ví dụ:
             <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
             <Route path="/thuoc-dong-y/:slug" element={<ProductDetail />} />
          */}
        </Routes>
      </div>

      {/* Sidebar Chat & Footer */}
      <SidebarChat />
      <Footer />
    </div>
  );
}

export default App;