// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route tin tức
const ctrl = require("../controllers/news");

// Định nghĩa các tuyến đường (routes) cho 'tin tức'

// GET /api/news: Lấy tất cả các bài viết tin tức
router.get("/", ctrl.getAll);
// GET /api/news/:id: Lấy một bài viết tin tức theo ID
router.get("/:id", ctrl.getById);
// GET /api/news/slug/:slug: Lấy một bài viết tin tức theo slug
router.get("/slug/:slug", ctrl.getBySlug);
// POST /api/news: Tạo một bài viết tin tức mới
router.post("/", ctrl.create);
// PUT /api/news/:id: Cập nhật một bài viết tin tức theo ID
router.put("/:id", ctrl.update);
// DELETE /api/news/:id: Xóa một bài viết tin tức theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;

