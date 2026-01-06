/**
 * ErrorMessage - Component hiển thị thông báo lỗi
 * Có 2 variants: 'main' (toàn màn hình) và 'inline' (trong nội dung)
 */
export default function ErrorMessage({ message = "Có lỗi xảy ra", variant = "main" }) {
  if (variant === "inline") {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
        {message}
      </div>
    );
  }

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-700 text-xl">
        Lỗi: {message}
      </div>
    </main>
  );
}
