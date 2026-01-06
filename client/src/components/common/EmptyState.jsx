/**
 * EmptyState - Component hiển thị khi không có dữ liệu
 */
export default function EmptyState({ message = "Không có dữ liệu để hiển thị" }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
}
