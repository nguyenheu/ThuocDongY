import React from 'react';

export default function ClinicIntro() {
  return (
    <section className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-12 md:mb-16">
      <h2 className="text-3xl font-bold text-red-700 mb-6">
        Giới thiệu về Phúc Hưng Đường
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Hình ảnh */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          {/* Bạn nhớ thay ảnh thật vào folder assets nhé */}
          <img
            src="/images/phuchungduong-intro.jpg" 
            alt="Phúc Hưng Đường"
            className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
            onError={(e) => {e.target.src = 'https://via.placeholder.com/600x400?text=Phuc+Hung+Duong'}}
          />
        </div>

        {/* Nội dung text */}
        <div className="space-y-4 text-gray-700 leading-7">
          <p>
            Phúc Hưng Đường là một trong những thương hiệu Đông y uy tín hàng đầu tại Việt Nam, 
            với lịch sử phát triển lâu đời và cam kết mang đến những sản phẩm chất lượng cao, 
            giúp chăm sóc sức khỏe cộng đồng bằng tinh hoa y học cổ truyền.
          </p>
          <p>
            Chúng tôi tự hào kế thừa và phát huy những bài thuốc quý, kết hợp với công nghệ 
            sản xuất hiện đại, để tạo ra các sản phẩm an toàn, hiệu quả và phù hợp với người Việt.
          </p>
        </div>
      </div>
    </section>
  );
}