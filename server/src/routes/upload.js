// Import module express để tạo và quản lý các route
const express = require("express");
// Tạo một đối tượng router mới từ express
const router = express.Router();
// Import controller xử lý logic cho route upload
const uploadCtrl = require("../controllers/upload");

// Định nghĩa các tuyến đường (routes) cho 'upload'

// POST /api/upload: Xử lý yêu cầu upload ảnh
router.post("/", uploadCtrl.uploadImage);

// Xuất router để có thể sử dụng trong file index.js chính
module.exports = router;
