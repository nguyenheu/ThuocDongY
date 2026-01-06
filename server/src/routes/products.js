// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route sản phẩm
const ctrl = require("../controllers/products");

/**
 * Định nghĩa các tuyến đường (routes) cho quản lý sản phẩm (Products).
 */

// GET /api/products: Lấy tất cả các sản phẩm
router.get("/", ctrl.getAll);
// GET /api/products/:id: Lấy một sản phẩm theo ID
router.get("/:id", ctrl.getById);
// GET /api/products/slug/:slug: Lấy một sản phẩm theo slug
router.get("/slug/:slug", ctrl.getBySlug);
// POST /api/products: Tạo một sản phẩm mới
router.post("/", ctrl.create);
// PUT /api/products/:id: Cập nhật một sản phẩm theo ID
router.put("/:id", ctrl.update);
// DELETE /api/products/:id: Xóa một sản phẩm theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;