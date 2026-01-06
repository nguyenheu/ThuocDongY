import React from 'react';

export default function IntroSection({ section, layout = "left" }) {
  if (!section) return null;

  const { title, content, image } = section;

  // Render nội dung text
  const TextContent = () => (
    <div>
      <h2 className="text-3xl font-bold text-red-700 mb-6">{title}</h2>
      <p className="text-gray-700 leading-7 whitespace-pre-wrap">{content}</p>
    </div>
  );

  // Render hình ảnh
  const ImageContent = () => (
    image ? (
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
    ) : null
  );

  // Logic render dựa trên layout
  const renderLayout = () => {
    switch (layout) {
      case 'left': // Ảnh trái, Text phải
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ImageContent />
            <TextContent />
          </div>
        );
      case 'right': // Text trái, Ảnh phải
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1"><TextContent /></div>
            <div className="order-1 md:order-2"><ImageContent /></div>
          </div>
        );
      default: // Không ảnh hoặc layout khác
        return <TextContent />;
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-12 md:mb-16">
      {renderLayout()}
    </section>
  );
}