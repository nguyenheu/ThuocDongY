// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route Đông y & Phật pháp (phiên bản thứ hai)
const ctrl = require("../controllers/dongYPhatPhap");

/**
 * Định nghĩa các tuyến đường (routes) cho quản lý bài viết Đông y & Phật pháp (phiên bản thứ hai).
 * Ghi chú: Có vẻ như có sự trùng lặp với `routes/dong_y_phat_phap.js`. Cần xem xét việc hợp nhất hoặc làm rõ mục đích sử dụng.
 */

// GET /api/dong-y-phat-phap-alt: Lấy tất cả các bài viết Đông y & Phật pháp
router.get("/", ctrl.getAll);
// GET /api/dong-y-phat-phap-alt/:id: Lấy một bài viết Đông y & Phật pháp theo ID
router.get("/:id", ctrl.getById);
// GET /api/dong-y-phat-phap-alt/slug/:slug: Lấy một bài viết Đông y & Phật pháp theo slug
router.get("/slug/:slug", ctrl.getBySlug);
// POST /api/dong-y-phat-phap-alt: Tạo một bài viết Đông y & Phật pháp mới
router.post("/", ctrl.create);
// PUT /api/dong-y-phat-phap-alt/:id: Cập nhật một bài viết Đông y & Phật pháp theo ID
router.put("/:id", ctrl.update);
// DELETE /api/dong-y-phat-phap-alt/:id: Xóa một bài viết Đông y & Phật pháp theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;

