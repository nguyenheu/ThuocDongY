// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho các route banner
const ctrl = require("../controllers/banners");

// Định nghĩa các tuyến đường (routes) cho 'banner'

// GET /api/banners: Lấy tất cả các banner
router.get("/", ctrl.getAll);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;
