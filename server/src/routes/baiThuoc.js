// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route bài thuốc
const ctrl = require("../controllers/baiThuoc");

// Định nghĩa các tuyến đường (routes) cho 'bài thuốc'

// GET /api/bai-thuoc: Lấy tất cả bài thuốc
router.get("/", ctrl.getAll);
// GET /api/bai-thuoc/:id: Lấy một bài thuốc theo ID
router.get("/:id", ctrl.getById);
// GET /api/bai-thuoc/slug/:slug: Lấy một bài thuốc theo slug
router.get("/slug/:slug", ctrl.getBySlug);
// POST /api/bai-thuoc: Tạo một bài thuốc mới
router.post("/", ctrl.create);
// PUT /api/bai-thuoc/:id: Cập nhật một bài thuốc theo ID
router.put("/:id", ctrl.update);
// DELETE /api/bai-thuoc/:id: Xóa một bài thuốc theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;
