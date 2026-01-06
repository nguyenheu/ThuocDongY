// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route giới thiệu
const ctrl = require("../controllers/intro");

// Định nghĩa các tuyến đường (routes) cho 'giới thiệu'

// GET /api/intro: Lấy tất cả các phần giới thiệu
router.get("/", ctrl.getAll);
// GET /api/intro/:slug: Lấy một phần giới thiệu theo slug
router.get("/:slug", ctrl.getBySlug);
// POST /api/intro: Tạo một phần giới thiệu mới
router.post("/", ctrl.create);
// PUT /api/intro/:id: Cập nhật một phần giới thiệu theo ID
router.put("/:id", ctrl.update);
// DELETE /api/intro/:id: Xóa một phần giới thiệu theo ID
router.delete("/:id", ctrl.remove);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;
