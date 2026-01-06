const db = require("../config/db");

/**
 * Lấy tất cả các bài viết tin tức từ cơ sở dữ liệu.
 * Chỉ lấy các trường id, title, slug, excerpt, image, created_at.
 * Sắp xếp theo thời gian tạo giảm dần.
 * @param {Object} req - Đối tượng request từ client.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getAll(req, res) {
    try {
        // Thực hiện truy vấn để lấy các trường thông tin cơ bản của tất cả các bài viết tin tức
        const [rows] = await db.query(
            "SELECT id, title, slug, excerpt, image, created_at FROM news ORDER BY created_at DESC"
        );
        // Gửi danh sách bài viết tin tức về client dưới dạng JSON
        res.json(rows);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một bài viết tin tức theo ID.
 * @param {Object} req - Đối tượng request chứa ID của bài viết tin tức trong params.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getById(req, res) {
    try {
        // Lấy ID từ params và chuyển đổi sang số nguyên
        const id = parseInt(req.params.id, 10);
        // Thực hiện truy vấn để lấy bài viết tin tức theo ID
        const [rows] = await db.query("SELECT * FROM news WHERE id = ?", [id]);
        // Nếu không tìm thấy bài viết tin tức, trả về lỗi 404
        if (!rows.length)
            return res.status(404).json({ error: "Không tìm thấy tin tức" });
        // Gửi bài viết tin tức tìm được về client
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một bài viết tin tức theo slug (đường dẫn thân thiện).
 * @param {Object} req - Đối tượng request chứa slug của bài viết tin tức trong params.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getBySlug(req, res) {
    try {
        // Lấy slug từ params
        const slug = req.params.slug;
        // Thực hiện truy vấn để lấy bài viết tin tức theo slug
        const [rows] = await db.query("SELECT * FROM news WHERE slug = ?", [slug]);
        // Nếu không tìm thấy bài viết tin tức, trả về lỗi 404
        if (!rows.length)
            return res.status(404).json({ error: "Không tìm thấy tin tức" });
        // Gửi bài viết tin tức tìm được về client
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Tạo một bài viết tin tức mới.
 * @param {Object} req - Đối tượng request chứa thông tin bài viết tin tức cần tạo.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function create(req, res) {
    try {
        // Lấy các trường thông tin từ body của request
        const { title, slug, excerpt, image, content } = req.body;
        // Kiểm tra các trường bắt buộc
        if (!title || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn INSERT để thêm bài viết tin tức mới vào cơ sở dữ liệu
        const [result] = await db.query(
            "INSERT INTO news (title, slug, excerpt, image, content) VALUES (?, ?, ?, ?, ?)",
            [title, slug, excerpt, image, content]
        );
        // Gửi phản hồi thành công với ID của bài viết tin tức vừa tạo
        res.status(201).json({ id: result.insertId, message: "Tạo tin tức thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Cập nhật thông tin của một bài viết tin tức hiện có.
 * @param {Object} req - Đối tượng request chứa ID bài viết tin tức và thông tin cập nhật.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function update(req, res) {
    try {
        // Lấy ID của bài viết tin tức từ tham số URL và chuyển đổi sang số nguyên
        const id = parseInt(req.params.id, 10);
        // Lấy các trường thông tin cập nhật từ body của request
        const { title, slug, excerpt, image, content } = req.body;
        // Kiểm tra các trường bắt buộc
        if (!title || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn UPDATE để cập nhật thông tin bài viết tin tức
        const [result] = await db.query(
            "UPDATE news SET title = ?, slug = ?, excerpt = ?, image = ?, content = ? WHERE id = ?",
            [title, slug, excerpt, image, content, id]
        );
        // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy bài viết tin tức
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy tin tức để cập nhật" });
        }
        // Gửi phản hồi thành công
        res.json({ message: "Cập nhật tin tức thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Xóa một bài viết tin tức khỏi cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID của bài viết tin tức cần xóa.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function remove(req, res) {
    try {
        // Lấy ID của bài viết tin tức từ tham số URL và chuyển đổi sang số nguyên
        const id = parseInt(req.params.id, 10);
        // Thực hiện truy vấn DELETE để xóa bài viết tin tức
        const [result] = await db.query("DELETE FROM news WHERE id = ?", [id]);
        // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy bài viết tin tức
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy tin tức để xóa" });
        }
        // Gửi phản hồi thành công
        res.json({ message: "Xóa tin tức thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

// Xuất các hàm để sử dụng trong các module khác
module.exports = { getAll, getById, getBySlug, create, update, remove };

