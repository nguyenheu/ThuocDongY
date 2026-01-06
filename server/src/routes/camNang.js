// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route cẩm nang
const ctrl = require("../controllers/camNang");

// Định nghĩa các tuyến đường (routes) cho 'cẩm nang'

// GET /api/cam-nang: Lấy tất cả các mục cẩm nang
router.get("/", ctrl.getAll);
// GET /api/cam-nang/:id: Lấy một mục cẩm nang theo ID
router.get("/:id", ctrl.getById);
// GET /api/cam-nang/slug/:slug: Lấy một mục cẩm nang theo slug
router.get("/slug/:slug", ctrl.getBySlug);
// POST /api/cam-nang: Tạo một mục cẩm nang mới
router.post("/", ctrl.create);
// PUT /api/cam-nang/:id: Cập nhật một mục cẩm nang theo ID
router.put("/:id", ctrl.update);
// DELETE /api/cam-nang/:id: Xóa một mục cẩm nang theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;
