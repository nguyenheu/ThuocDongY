// Import các module cần thiết
const express = require("express"); // Framework web cho Node.js
const cors = require("cors");       // Middleware để cho phép Cross-Origin Resource Sharing
require("dotenv").config();        // Tải các biến môi trường từ file .env
const path = require("path"); // Module để làm việc với đường dẫn file

// Import các module định tuyến (routes) cho các tài nguyên khác nhau
const products = require("./routes/products");
const categories = require("./routes/categories");
const news = require("./routes/news");
const banners = require("./routes/banners");
const intro = require("./routes/intro");
const upload = require("./routes/upload");
const cam_nang = require("./routes/camNang");
const bai_thuoc = require("./routes/baiThuoc");
const duoc_lieu = require("./routes/duocLieu");
const dong_y_phat_phap = require("./routes/dongYPhatPhap");

// Khởi tạo ứng dụng Express
const app = express();

// Sử dụng middleware CORS để cho phép các yêu cầu từ các nguồn gốc khác nhau
app.use(cors());
// Sử dụng middleware express.json để phân tích các yêu cầu có body là JSON
app.use(express.json());

// Cấu hình các thư mục tĩnh để phục vụ các tài nguyên frontend
// Các tài nguyên này có thể được truy cập trực tiếp thông qua URL

// Phục vụ các tài sản trong thư mục assets của frontend
app.use("/assets", express.static(path.join(__dirname, "../../src/assets")));
// Phục vụ các hình ảnh trong thư mục public/images
app.use("/images", express.static(path.join(__dirname, "../../public/images")));
// Phục vụ các file đã upload trong thư mục public/uploads
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Định nghĩa các tuyến đường API chính cho ứng dụng

// Tuyến đường cho sản phẩm
app.use("/api/products", products);
// Tuyến đường cho danh mục
app.use("/api/categories", categories);
// Tuyến đường cho tin tức
app.use("/api/news", news);
// Tuyến đường cho banner
app.use("/api/banners", banners);
// Tuyến đường cho phần giới thiệu
app.use("/api/intro", intro);
// Tuyến đường cho chức năng upload
app.use("/api/upload", upload);
// Tuyến đường cho cẩm nang
app.use("/api/cam-nang", cam_nang);
// Tuyến đường cho bài thuốc
app.use("/api/bai-thuoc", bai_thuoc);
// Tuyến đường cho dược liệu
app.use("/api/duoc-lieu", duoc_lieu);
// Tuyến đường cho Đông y & Phật pháp
app.use("/api/dong-y-phat-phap", dong_y_phat_phap);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));