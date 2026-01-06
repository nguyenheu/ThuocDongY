const db = require("../config/db");

async function getAll(req, res) {
    try {
        const [rows] = await db.query("SELECT * FROM bai_thuoc ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        const [rows] = await db.query("SELECT * FROM bai_thuoc WHERE id = ?", [id]);
        if (!rows.length) {
            return res.status(404).json({ error: "Không tìm thấy bài thuốc" });
        }
        // Nếu tìm thấy, gửi mục bài thuốc đầu tiên
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

async function getBySlug(req, res) {
    try {
        const slug = req.params.slug;
        const [rows] = await db.query("SELECT * FROM bai_thuoc WHERE slug = ?", [slug]);
        if (!rows.length) {
            return res.status(404).json({ error: "Không tìm thấy bài thuốc" });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

async function create(req, res) {
    try {
        const { title, slug, excerpt, content, image } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }

        const [result] = await db.query(
            "INSERT INTO bai_thuoc (title, slug, excerpt, content, image) VALUES (?, ?, ?, ?, ?)",
            [title, slug, excerpt, content, image]
        );
        res.status(201).json({ id: result.insertId, message: "Tạo bài thuốc thành công" });
    } catch (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        res.status(500).json({ error: "Lỗi server" });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { title, slug, excerpt, content, image } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        const [result] = await db.query(
            "UPDATE bai_thuoc SET title = ?, slug = ?, excerpt = ?, content = ?, image = ? WHERE id = ?",
            [title, slug, excerpt, content, image, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy bài thuốc để cập nhật" });
        }
        res.json({ message: "Cập nhật bài thuốc thành công" });
    } catch (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        res.status(500).json({ error: "Lỗi server" });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM bai_thuoc WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy bài thuốc để xóa" });
        }
        res.json({ message: "Xóa bài thuốc thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

module.exports = {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    remove,
};
