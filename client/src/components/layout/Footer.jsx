import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Cột 1 */}
          <div>
            <h4 className="font-bold text-lg mb-3">Công ty TNHH Đông dược Phúc Hưng</h4>
            <p className="text-sm text-gray-200">
              Số 96 - 98 Nguyễn Viết Xuân, phường Quang Trung, quận Hà Đông, TP. Hà Nội
            </p>
          </div>
          {/* Cột 2 */}
          <div>
            <h4 className="font-bold text-lg mb-3">Liên hệ</h4>
            <p className="text-sm text-gray-200">Email: cskh@dongduocphuchung.com.vn</p>
            <p className="text-sm text-gray-200">Điện thoại: 1800 5454 35</p>
          </div>
          {/* Cột 3 */}
          <div>
            <h4 className="font-bold text-lg mb-3">Liên kết</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-200 hover:text-white text-sm">Việc làm</a>
              <a href="#" className="text-gray-200 hover:text-white text-sm">Sơ đồ website</a>
              <a href="#" className="text-gray-200 hover:text-white text-sm">Liên hệ</a>
            </div>
          </div>
        </div>
        <div className="border-t border-red-800 pt-4 text-center text-sm text-gray-200">
          Copyright © 2006 - 2025 PHUC HUNG
        </div>
      </div>
    </footer>
  );
}