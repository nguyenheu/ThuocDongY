import React from 'react';

export default function MarqueeSection() {
  const text = "Đông Dược Phúc Hưng - Thuốc Nam của người Việt • Trị bệnh tận gốc • Hiệu quả bền vững • ";
  
  return (
    <section className="mt-8 mb-4 overflow-hidden bg-red-700 text-white py-3">
      <div className="whitespace-nowrap animate-marquee inline-block">
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
      <style>{`
        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}