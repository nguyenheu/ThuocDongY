// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route dược liệu
const ctrl = require("../controllers/duocLieu");

// Định nghĩa các tuyến đường (routes) cho 'dược liệu'

// GET /api/duoc-lieu: Lấy tất cả các dược liệu
router.get("/", ctrl.getAll);
// GET /api/duoc-lieu/:id: Lấy một dược liệu theo ID
router.get("/:id", ctrl.getById);
// GET /api/duoc-lieu/slug/:slug: Lấy một dược liệu theo slug
router.get("/slug/:slug", ctrl.getBySlug);
// POST /api/duoc-lieu: Tạo một dược liệu mới
router.post("/", ctrl.create);
// PUT /api/duoc-lieu/:id: Cập nhật một dược liệu theo ID
router.put("/:id", ctrl.update);
// DELETE /api/duoc-lieu/:id: Xóa một dược liệu theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;
