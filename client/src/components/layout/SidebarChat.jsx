import React, { useState } from "react";

// ============== CONSTANTS ==============
const CONTACT_BUTTONS = [
  {
    id: "zalo",
    label: "Zalo",
    href: "https://zalo.me/",
    bgColor: "bg-[#1E88E5]",
    icon: "Z",
  },
  {
    id: "phone",
    label: "Phone",
    href: "tel:1800545435",
    bgColor: "bg-[#8e44ad]",
    icon: "☎",
  },
  {
    id: "chat",
    label: "Chat",
    href: "#",
    bgColor: "bg-[#25D366]",
    icon: "💬",
  },
];

const SUPPORT_INFO = {
  TITLE: "Hỗ trợ",
  MESSAGE: "Chào bạn! Bạn đang có băn khoăn về sức khỏe cần được giải đáp?",
  HOTLINE: "1800 5454 35",
};

// ============== SUB COMPONENTS ==============

/**
 * ContactButton - Nút liên hệ nhanh
 */
function ContactButton({ button }) {
  return (
    <a
      href={button.href}
      className={`w-11 h-11 ${button.bgColor} rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200`}
      aria-label={button.label}
      title={button.label}
    >
      <span className="text-white text-lg font-semibold">
        {button.icon}
      </span>
    </a>
  );
}

/**
 * ContactSidebar - Thanh liên hệ nhanh bên trái
 */
function ContactSidebar() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {CONTACT_BUTTONS.map((button) => (
        <ContactButton key={button.id} button={button} />
      ))}
    </div>
  );
}

/**
 * ChatHeader - Thanh tiêu đề của hộp chat
 */
function ChatHeader({ onMenuClick }) {
  return (
    <div className="bg-green-600 text-white px-3 py-2 rounded-t-lg flex items-center justify-between">
      <span className="font-medium">{SUPPORT_INFO.TITLE}</span>
      <button
        onClick={onMenuClick}
        className="text-xl leading-none hover:opacity-80 transition-opacity"
        aria-label="Menu"
      >
        ≡
      </button>
    </div>
  );
}

/**
 * ChatInput - Ô nhập tin nhắn
 */
function ChatInput({ message, onChange, onSend }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 transition-colors"
        placeholder="Nhập nội dung..."
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 rounded text-sm hover:bg-green-700 transition-colors duration-200"
      >
        Gửi
      </button>
    </form>
  );
}

/**
 * ChatBox - Hộp hỗ trợ khách hàng
 */
function ChatBox() {
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Tin nhắn được gửi:", message);
      setMessage("");
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed right-4 bottom-4 w-80 z-50 drop-shadow-xl">
      <ChatHeader onMenuClick={handleMenuClick} />

      <div className="bg-white p-3 rounded-b-lg border-2 border-t-0 border-green-600 space-y-3">
        {/* Tin nhắn chào mừng */}
        <p className="text-xs text-gray-700 leading-relaxed">
          {SUPPORT_INFO.MESSAGE}
        </p>

        {/* Thông tin hotline */}
        <div className="text-xs text-gray-600">
          Hotline:{" "}
          <a
            href="tel:1800545435"
            className="font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            {SUPPORT_INFO.HOTLINE}
          </a>
        </div>

        {/* Input và nút gửi */}
        <ChatInput
          message={message}
          onChange={setMessage}
          onSend={handleSendMessage}
        />

        {/* Menu (ẩn/hiện theo state) */}
        {isMenuOpen && (
          <div className="pt-2 border-t border-gray-200 text-xs text-gray-600 space-y-1">
            <p>• Tư vấn về sản phẩm</p>
            <p>• Hỏi về cách sử dụng</p>
            <p>• Kiểm tra đơn hàng</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============== MAIN COMPONENT ==============

/**
 * SidebarChat - Component chính hiển thị thanh liên hệ nhanh bên trái
 * và hộp hỗ trợ khách hàng nổi ở góc dưới bên phải
 */
export default function SidebarChat() {
  return (
    <>
      <ContactSidebar />
      <ChatBox />
    </>
  );
}