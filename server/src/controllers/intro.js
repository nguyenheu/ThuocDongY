const db = require("../config/db");

/**
 * Lấy tất cả các phần giới thiệu (intro sections) từ cơ sở dữ liệu.
 * Sắp xếp theo thứ tự hiển thị (order_index) tăng dần.
 * @param {Object} req - Đối tượng request từ client.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getAll(req, res) {
    try {
        // Thực hiện truy vấn để lấy tất cả các phần giới thiệu
        const [rows] = await db.query("SELECT * FROM intro_sections ORDER BY order_index ASC");
        // Gửi danh sách các phần giới thiệu về client dưới dạng JSON
        res.json(rows);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một phần giới thiệu theo slug (đường dẫn thân thiện).
 * @param {Object} req - Đối tượng request chứa slug của phần giới thiệu trong params.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getBySlug(req, res) {
    try {
        // Lấy slug từ params
        const { slug } = req.params;
        // Thực hiện truy vấn để lấy phần giới thiệu theo slug
        const [rows] = await db.query("SELECT * FROM intro_sections WHERE slug = ?", [slug]);
        // Nếu không tìm thấy phần giới thiệu, trả về lỗi 404
        if (rows.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy phần giới thiệu" });
        }
        // Gửi phần giới thiệu tìm được về client
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Tạo một phần giới thiệu mới.
 * @param {Object} req - Đối tượng request chứa thông tin phần giới thiệu cần tạo.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function create(req, res) {
    try {
        // Lấy các trường thông tin từ body của request, order_index mặc định là 0
        const { title, slug, content, image, order_index = 0 } = req.body;
        // Kiểm tra các trường bắt buộc
        if (!title || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn INSERT để thêm phần giới thiệu mới vào cơ sở dữ liệu
        const [result] = await db.query(
            "INSERT INTO intro_sections (title, slug, content, image, order_index) VALUES (?, ?, ?, ?, ?)",
            [title, slug, content, image, order_index]
        );
        // Gửi phản hồi thành công với ID của phần giới thiệu vừa tạo
        res.status(201).json({ id: result.insertId, message: "Tạo phần giới thiệu thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console
        console.error(err);
        // Kiểm tra nếu lỗi là do trùng lặp slug
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        // Gửi lỗi server 500 về client cho các lỗi khác
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Cập nhật thông tin của một phần giới thiệu hiện có.
 * @param {Object} req - Đối tượng request chứa ID phần giới thiệu và thông tin cập nhật.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function update(req, res) {
    try {
        // Lấy ID của phần giới thiệu từ tham số URL
        const { id } = req.params;
        // Lấy các trường thông tin cập nhật từ body của request
        const { title, slug, content, image, order_index } = req.body;
        // Kiểm tra các trường bắt buộc
        if (!title || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn UPDATE để cập nhật thông tin phần giới thiệu
        const [result] = await db.query(
            "UPDATE intro_sections SET title = ?, slug = ?, content = ?, image = ?, order_index = ? WHERE id = ?",
            [title, slug, content, image, order_index, id]
        );
        // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy phần giới thiệu
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy phần giới thiệu" });
        }
        // Gửi phản hồi thành công
        res.json({ message: "Cập nhật phần giới thiệu thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console
        console.error(err);
        // Kiểm tra nếu lỗi là do trùng lặp slug
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        // Gửi lỗi server 500 về client cho các lỗi khác
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Xóa một phần giới thiệu khỏi cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID của phần giới thiệu cần xóa.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function remove(req, res) {
    try {
        // Lấy ID của phần giới thiệu từ tham số URL
        const { id } = req.params;
        // Thực hiện truy vấn DELETE để xóa phần giới thiệu
        const [result] = await db.query("DELETE FROM intro_sections WHERE id = ?", [id]);
        // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy phần giới thiệu
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy phần giới thiệu" });
        }
        // Gửi phản hồi thành công
        res.json({ message: "Xóa phần giới thiệu thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

// Xuất các hàm để sử dụng trong các module khác
module.exports = {
    getAll,
    getBySlug,
    create,
    update,
    remove,
};
