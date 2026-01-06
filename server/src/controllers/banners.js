const db = require("../config/db");

/**
 * Lấy tất cả các banner từ cơ sở dữ liệu.
 * Sắp xếp theo ID giảm dần.
 * @param {Object} req - Đối tượng request từ client (không sử dụng trong hàm này).
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getAll(req, res) {
    try {
        // Thực hiện truy vấn SELECT để lấy tất cả các banner từ bảng 'banners',
        // sắp xếp kết quả theo cột 'id' theo thứ tự giảm dần.
        const [rows] = await db.query("SELECT * FROM banners ORDER BY id DESC");
        // Gửi danh sách các banner đã truy vấn được về client dưới dạng JSON.
        res.json(rows);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn hoặc xử lý, ghi lỗi vào console để debug.
        console.error(err);
        // Gửi một phản hồi lỗi với trạng thái HTTP 500 (Internal Server Error) về client,
        // kèm theo một thông báo lỗi JSON.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Tạo một banner mới và lưu vào cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa thông tin banner cần tạo trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function create(req, res) {
    try {
        // Destructuring các trường 'title', 'image', 'link' từ `req.body`.
        // 'order_index' có giá trị mặc định là 0 nếu không được cung cấp trong request.
        const { title, image, link, order_index = 0 } = req.body;
        // Kiểm tra xem các trường bắt buộc 'title' và 'image' có bị thiếu không.
        if (!title || !image) {
            // Nếu thiếu, gửi phản hồi lỗi 400 (Bad Request) về client với thông báo cụ thể.
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, image" });
        }
        // Thực hiện truy vấn INSERT INTO để thêm một hàng mới vào bảng 'banners'.
        // Các giá trị được truyền dưới dạng mảng để ngăn chặn SQL injection.
        const [result] = await db.query(
            "INSERT INTO banners (title, image, link, order_index) VALUES (?, ?, ?, ?)",
            [title, image, link, order_index]
        );
        // Gửi phản hồi thành công với trạng thái HTTP 201 (Created),
        // kèm theo ID của banner vừa được chèn và một thông báo.
        res.status(201).json({ id: result.insertId, message: "Tạo banner thành công" });
    } catch (err) {
        // Nếu có lỗi xảy ra, ghi lỗi vào console.
        console.error(err);
        // Gửi lỗi server 500 (Internal Server Error) về client.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Cập nhật thông tin của một banner hiện có trong cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID banner trong `req.params.id` và thông tin cập nhật trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function update(req, res) {
    try {
        // Lấy ID của banner từ `req.params`.
        const { id } = req.params;
        // Destructuring các trường thông tin cập nhật từ `req.body`.
        const { title, image, link, order_index } = req.body;
        // Kiểm tra các trường bắt buộc 'title' và 'image'.
        if (!title || !image) {
            // Nếu thiếu, gửi phản hồi lỗi 400 (Bad Request).
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, image" });
        }
        // Thực hiện truy vấn UPDATE để cập nhật các cột của banner có ID khớp.
        const [result] = await db.query(
            "UPDATE banners SET title = ?, image = ?, link = ?, order_index = ? WHERE id = ?",
            [title, image, link, order_index, id]
        );
        // Kiểm tra xem có hàng nào bị ảnh hưởng bởi truy vấn UPDATE không.
        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy banner với ID đã cho,
            // gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy banner để cập nhật" });
        }
        // Gửi phản hồi thành công nếu cập nhật hoàn tất.
        res.json({ message: "Cập nhật banner thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console.
        console.error(err);
        // Gửi lỗi server 500 (Internal Server Error) về client.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Xóa một banner khỏi cơ sở dữ liệu dựa trên ID của nó.
 * @param {Object} req - Đối tượng request chứa ID của banner cần xóa trong `req.params.id`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function remove(req, res) {
    try {
        // Lấy ID của banner từ `req.params`.
        const { id } = req.params;
        // Thực hiện truy vấn DELETE để xóa banner có ID khớp.
        const [result] = await db.query("DELETE FROM banners WHERE id = ?", [id]);
        // Kiểm tra xem có hàng nào bị ảnh hưởng bởi truy vấn DELETE không.
        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy banner với ID đã cho,
            // gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy banner để xóa" });
        }
        // Gửi phản hồi thành công nếu xóa hoàn tất.
        res.json({ message: "Xóa banner thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

// Xuất các hàm điều khiển để có thể sử dụng trong các module khác (ví dụ: trong định tuyến).
module.exports = {
    getAll,
    create,
    update,
    remove,
};
