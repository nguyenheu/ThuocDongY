// Import các module cần thiết
const multer = require("multer"); // Middleware xử lý upload file
const path = require("path");     // Module xử lý đường dẫn file
const fs = require("fs");         // Module làm việc với hệ thống file

// Định nghĩa thư mục lưu trữ các file đã upload
const uploadDir = path.join(__dirname, "../../public/uploads");

// Kiểm tra và tạo thư mục upload nếu nó chưa tồn tại
// recursive: true đảm bảo rằng tất cả các thư mục cha cũng sẽ được tạo nếu cần
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình lưu trữ cho Multer
const storage = multer.diskStorage({
    // Định nghĩa thư mục đích để lưu trữ file
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    // Định nghĩa tên file sau khi lưu trữ
    filename: function (req, file, cb) {
        // Đặt tên file là timestamp hiện tại để đảm bảo tính duy nhất
        // Kèm theo phần mở rộng (extension) gốc của file
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Bộ lọc file để chỉ chấp nhận các loại file ảnh
const fileFilter = (req, file, cb) => {
    // Kiểm tra mimetype của file có bắt đầu bằng 'image/' hay không
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Chấp nhận file
    } else {
        cb(new Error("Chỉ cho phép upload file ảnh!"), false); // Từ chối file và trả về lỗi
    }
};

// Khởi tạo Multer middleware với cấu hình đã định nghĩa
const upload = multer({
    storage: storage, // Cấu hình lưu trữ
    fileFilter: fileFilter, // Cấu hình bộ lọc file
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file là 5MB (5 * 1024 * 1024 bytes)
}).single("image"); // Chỉ cho phép upload một file duy nhất với tên trường input là 'image'

/**
 * Xử lý yêu cầu upload ảnh.
 * Sử dụng middleware Multer để thực hiện quá trình upload file.
 * @param {Object} req - Đối tượng request từ client.
 * @param {Object} res - Đối tượng response gửi về client.
 */
function uploadImage(req, res) {
    // Gọi middleware upload của Multer
    upload(req, res, function (err) {
        // Xử lý lỗi nếu có
        if (err instanceof multer.MulterError) {
            // Lỗi do Multer gây ra (ví dụ: kích thước file quá lớn, loại file không hợp lệ)
            console.error("Multer error:", err.message);
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // Các lỗi không xác định khác trong quá trình upload
            console.error("Unknown upload error:", err.message);
            return res.status(500).json({ error: err.message });
        }

        // Nếu không có file nào được upload (ví dụ: người dùng không chọn file)
        if (!req.file) {
            return res.status(400).json({ error: "Không có file ảnh được chọn." });
        }

        // Nếu upload thành công, trả về thông báo và đường dẫn của ảnh đã upload
        // Đường dẫn tương đối giúp frontend dễ dàng sử dụng
        const relativePath = `/uploads/${req.file.filename}`;
        res.status(200).json({ message: "Upload ảnh thành công!", imageUrl: relativePath });
    });
}

// Xuất hàm uploadImage để có thể sử dụng trong các module khác (ví dụ: trong định tuyến)
module.exports = {
    uploadImage,
};
