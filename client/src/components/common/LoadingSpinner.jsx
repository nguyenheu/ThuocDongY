/**
 * LoadingSpinner - Component hiển thị trạng thái tải dữ liệu
 * Có 2 variants: 'main' (toàn màn hình) và 'inline' (trong nội dung)
 */
export default function LoadingSpinner({ variant = "main", message = "Đang tải..." }) {
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-600">{message}</div>
      </div>
    );
  }

  return (
    <main className="bg-[#fff5eb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </main>
  );
}
