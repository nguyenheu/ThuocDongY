// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route danh mục
const ctrl = require("../controllers/categories");

/**
 * Định nghĩa các tuyến đường (routes) cho quản lý danh mục (Categories).
 */

// GET /api/categories: Lấy tất cả các danh mục
router.get("/", ctrl.getAll);
// GET /api/categories/:id: Lấy một danh mục theo ID
router.get("/:id", ctrl.getById);
// GET /api/categories/slug/:slug: Lấy một danh mục theo slug
router.get("/slug/:slug", ctrl.getBySlug);
// POST /api/categories: Tạo một danh mục mới
router.post("/", ctrl.create);
// PUT /api/categories/:id: Cập nhật một danh mục theo ID
router.put("/:id", ctrl.update);
// DELETE /api/categories/:id: Xóa một danh mục theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;

