const db = require("../config/db");

/**
 * Lấy tất cả các mục cẩm nang từ cơ sở dữ liệu.
 * Sắp xếp theo thời gian tạo giảm dần.
 * @param {Object} req - Đối tượng request từ client (không sử dụng trong hàm này).
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getAll(req, res) {
    try {
        // Thực hiện truy vấn SELECT để lấy tất cả các mục từ bảng 'cam_nang',
        // sắp xếp kết quả theo cột 'created_at' (thời gian tạo) theo thứ tự giảm dần.
        const [rows] = await db.query("SELECT * FROM cam_nang ORDER BY created_at DESC");
        // Gửi danh sách các mục cẩm nang đã truy vấn được về client dưới dạng JSON.
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
 * Lấy một mục cẩm nang cụ thể từ cơ sở dữ liệu dựa trên ID của nó.
 * @param {Object} req - Đối tượng request chứa ID của mục cẩm nang trong `req.params.id`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getById(req, res) {
    try {
        // Lấy ID từ `req.params` và chuyển đổi nó thành số nguyên.
        const id = parseInt(req.params.id, 10);
        // Thực hiện truy vấn SELECT để tìm một mục trong bảng 'cam_nang' có ID khớp.
        const [rows] = await db.query("SELECT * FROM cam_nang WHERE id = ?", [id]);
        // Kiểm tra nếu không tìm thấy mục nào (mảng 'rows' rỗng).
        if (!rows.length) {
            // Nếu không tìm thấy, gửi phản hồi lỗi 404 (Not Found) về client.
            return res.status(404).json({ error: "Không tìm thấy cẩm nang" });
        }
        // Nếu tìm thấy, gửi mục cẩm nang đầu tiên (phần tử 0) trong mảng về client.
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một mục cẩm nang cụ thể từ cơ sở dữ liệu dựa trên slug (đường dẫn thân thiện) của nó.
 * @param {Object} req - Đối tượng request chứa slug của mục cẩm nang trong `req.params.slug`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getBySlug(req, res) {
    try {
        // Lấy slug từ `req.params`.
        const slug = req.params.slug;
        // Thực hiện truy vấn SELECT để tìm một mục trong bảng 'cam_nang' có slug khớp.
        const [rows] = await db.query("SELECT * FROM cam_nang WHERE slug = ?", [slug]);
        // Kiểm tra nếu không tìm thấy mục nào.
        if (!rows.length) {
            // Nếu không tìm thấy, gửi phản hồi lỗi 404 (Not Found) về client.
            return res.status(404).json({ error: "Không tìm thấy cẩm nang" });
        }
        // Nếu tìm thấy, gửi mục cẩm nang đầu tiên trong mảng về client.
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Tạo một mục cẩm nang mới và lưu vào cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa thông tin mục cẩm nang cần tạo trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function create(req, res) {
    try {
        // Destructuring các trường 'title', 'slug', 'excerpt', 'content', 'image' từ `req.body`.
        const { title, slug, excerpt, content, image } = req.body;
        // Kiểm tra xem các trường bắt buộc 'title', 'slug', 'content' có bị thiếu không.
        if (!title || !slug || !content) {
            // Nếu thiếu, gửi phản hồi lỗi 400 (Bad Request) về client với thông báo cụ thể.
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn INSERT INTO để thêm một hàng mới vào bảng 'cam_nang'.
        // Các giá trị được truyền dưới dạng mảng để ngăn chặn SQL injection.
        const [result] = await db.query(
            "INSERT INTO cam_nang (title, slug, excerpt, content, image) VALUES (?, ?, ?, ?, ?)",
            [title, slug, excerpt, content, image]
        );
        // Gửi phản hồi thành công với trạng thái HTTP 201 (Created),
        // kèm theo ID của mục cẩm nang vừa được chèn và một thông báo.
        res.status(201).json({ id: result.insertId, message: "Tạo cẩm nang thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console.
        console.error(err);
        // Kiểm tra nếu lỗi MySQL có mã 'ER_DUP_ENTRY', tức là có sự trùng lặp giá trị cho một trường UNIQUE (ví dụ: slug).
        if (err.code === "ER_DUP_ENTRY") {
            // Gửi phản hồi lỗi 400 (Bad Request) về client với thông báo lỗi trùng slug.
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        // Đối với các loại lỗi khác, gửi lỗi server 500 về client.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Cập nhật thông tin của một mục cẩm nang hiện có trong cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID mục cẩm nang trong `req.params.id` và thông tin cập nhật trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function update(req, res) {
    try {
        // Lấy ID của mục cẩm nang từ `req.params`.
        const { id } = req.params;
        // Destructuring các trường thông tin cập nhật từ `req.body`.
        const { title, slug, excerpt, content, image } = req.body;
        // Kiểm tra các trường bắt buộc 'title', 'slug', 'content'.
        if (!title || !slug || !content) {
            // Nếu thiếu, gửi phản hồi lỗi 400 (Bad Request).
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn UPDATE để cập nhật các cột của mục cẩm nang có ID khớp.
        const [result] = await db.query(
            "UPDATE cam_nang SET title = ?, slug = ?, excerpt = ?, content = ?, image = ? WHERE id = ?",
            [title, slug, excerpt, content, image, id]
        );
        // Kiểm tra xem có hàng nào bị ảnh hưởng bởi truy vấn UPDATE không.
        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy mục cẩm nang với ID đã cho,
            // gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy cẩm nang để cập nhật" });
        }
        // Gửi phản hồi thành công nếu cập nhật hoàn tất.
        res.json({ message: "Cập nhật cẩm nang thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console.
        console.error(err);
        // Kiểm tra nếu lỗi là do trùng lặp slug.
        if (err.code === "ER_DUP_ENTRY") {
            // Gửi phản hồi lỗi 400 (Bad Request).
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        // Đối với các loại lỗi khác, gửi lỗi server 500.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Xóa một mục cẩm nang khỏi cơ sở dữ liệu dựa trên ID của nó.
 * @param {Object} req - Đối tượng request chứa ID của mục cẩm nang cần xóa trong `req.params.id`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function remove(req, res) {
    try {
        // Lấy ID của mục cẩm nang từ `req.params`.
        const { id } = req.params;
        // Thực hiện truy vấn DELETE để xóa mục cẩm nang có ID khớp.
        const [result] = await db.query("DELETE FROM cam_nang WHERE id = ?", [id]);
        // Kiểm tra xem có hàng nào bị ảnh hưởng bởi truy vấn DELETE không.
        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy mục cẩm nang với ID đã cho,
            // gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy cẩm nang để xóa" });
        }
        // Gửi phản hồi thành công nếu xóa hoàn tất.
        res.json({ message: "Xóa cẩm nang thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

// Xuất các hàm điều khiển để có thể sử dụng trong các module khác (ví dụ: trong định tuyến).
module.exports = {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    remove,
};
