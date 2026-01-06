const db = require("../config/db");

/**
 * Lấy tất cả các dược liệu từ cơ sở dữ liệu.
 * Sắp xếp theo thời gian tạo giảm dần.
 * @param {Object} req - Đối tượng request từ client.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getAll(req, res) {
    try {
        // Thực hiện truy vấn để lấy tất cả các dược liệu
        const [rows] = await db.query("SELECT * FROM duoc_lieu ORDER BY created_at DESC");
        // Gửi danh sách dược liệu về client dưới dạng JSON
        res.json(rows);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một dược liệu theo ID.
 * @param {Object} req - Đối tượng request chứa ID của dược liệu trong params.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getById(req, res) {
    try {
        // Lấy ID từ params và chuyển đổi sang số nguyên
        const id = parseInt(req.params.id, 10);
        // Thực hiện truy vấn để lấy dược liệu theo ID
        const [rows] = await db.query("SELECT * FROM duoc_lieu WHERE id = ?", [id]);
        // Nếu không tìm thấy dược liệu, trả về lỗi 404
        if (!rows.length) {
            return res.status(404).json({ error: "Không tìm thấy dược liệu" });
        }
        // Gửi dược liệu tìm được về client
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một dược liệu theo slug (đường dẫn thân thiện).
 * @param {Object} req - Đối tượng request chứa slug của dược liệu trong params.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getBySlug(req, res) {
    try {
        // Lấy slug từ params
        const slug = req.params.slug;
        // Thực hiện truy vấn để lấy dược liệu theo slug
        const [rows] = await db.query("SELECT * FROM duoc_lieu WHERE slug = ?", [slug]);
        // Nếu không tìm thấy dược liệu, trả về lỗi 404
        if (!rows.length) {
            return res.status(404).json({ error: "Không tìm thấy dược liệu" });
        }
        // Gửi dược liệu tìm được về client
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Tạo một dược liệu mới.
 * @param {Object} req - Đối tượng request chứa thông tin dược liệu cần tạo.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function create(req, res) {
    try {
        // Lấy các trường thông tin từ body của request
        const { name, slug, excerpt, content, image } = req.body;
        // Kiểm tra các trường bắt buộc
        if (!name || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: name, slug, content" });
        }
        // Thực hiện truy vấn INSERT để thêm dược liệu mới vào cơ sở dữ liệu
        const [result] = await db.query(
            "INSERT INTO duoc_lieu (name, slug, excerpt, content, image) VALUES (?, ?, ?, ?, ?)",
            [name, slug, excerpt, content, image]
        );
        // Gửi phản hồi thành công với ID của dược liệu vừa tạo
        res.status(201).json({ id: result.insertId, message: "Tạo dược liệu thành công" });
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
 * Cập nhật thông tin của một dược liệu hiện có.
 * @param {Object} req - Đối tượng request chứa ID dược liệu và thông tin cập nhật.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function update(req, res) {
    try {
        // Lấy ID của dược liệu từ tham số URL
        const { id } = req.params;
        // Lấy các trường thông tin cập nhật từ body của request
        const { name, slug, excerpt, content, image } = req.body;
        // Kiểm tra các trường bắt buộc
        if (!name || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: name, slug, content" });
        }
        // Thực hiện truy vấn UPDATE để cập nhật thông tin dược liệu
        const [result] = await db.query(
            "UPDATE duoc_lieu SET name = ?, slug = ?, excerpt = ?, content = ?, image = ? WHERE id = ?",
            [name, slug, excerpt, content, image, id]
        );
        // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy dược liệu
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy dược liệu để cập nhật" });
        }
        // Gửi phản hồi thành công
        res.json({ message: "Cập nhật dược liệu thành công" });
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
 * Xóa một dược liệu khỏi cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID của dược liệu cần xóa.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function remove(req, res) {
    try {
        // Lấy ID của dược liệu từ tham số URL
        const { id } = req.params;
        // Thực hiện truy vấn DELETE để xóa dược liệu
        const [result] = await db.query("DELETE FROM duoc_lieu WHERE id = ?", [id]);
        // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy dược liệu
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy dược liệu để xóa" });
        }
        // Gửi phản hồi thành công
        res.json({ message: "Xóa dược liệu thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

// Xuất các hàm để sử dụng trong các module khác
module.exports = {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    remove,
};
