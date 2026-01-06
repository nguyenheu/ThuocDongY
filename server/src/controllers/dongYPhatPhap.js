const db = require("../config/db");

/**
 * Module điều khiển (Controller) cho việc quản lý các bài viết về Đông y & Phật pháp.
 * Bao gồm các hàm xử lý logic nghiệp vụ cho các thao tác CRUD (Create, Read, Update, Delete)
 * đối với dữ liệu bài viết trong cơ sở dữ liệu.
 * 
 * Ghi chú: Có vẻ như có hai controller tương tự nhau cho "Đông y & Phật pháp": dong_y_phat_phap.js và dongYPhatPhap.js.
 * Cần xem xét việc hợp nhất hoặc làm rõ mục đích sử dụng của từng file để tránh trùng lặp code và dễ bảo trì hơn.
 */

/**
 * Lấy tất cả các bài viết Đông y & Phật pháp từ cơ sở dữ liệu.
 * Chỉ lấy các trường id, title, slug, excerpt, image, created_at.
 * Sắp xếp theo thời gian tạo giảm dần.
 * @param {Object} req - Đối tượng request từ client (không sử dụng trong hàm này).
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getAll(req, res) {
    try {
        // Thực hiện truy vấn SELECT để lấy các trường thông tin cơ bản của tất cả các bài viết Đông y & Phật pháp
        // từ bảng 'dong_y_phat_phap', sắp xếp kết quả theo cột 'created_at' (thời gian tạo) theo thứ tự giảm dần.
        const [rows] = await db.query(
            "SELECT id, title, slug, excerpt, image, created_at FROM dong_y_phat_phap ORDER BY created_at DESC"
        );
        // Gửi danh sách các bài viết đã truy vấn được về client dưới dạng JSON.
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
 * Lấy một bài viết Đông y & Phật pháp cụ thể từ cơ sở dữ liệu dựa trên ID của nó.
 * @param {Object} req - Đối tượng request chứa ID của bài viết trong `req.params.id`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getById(req, res) {
    try {
        // Lấy ID từ `req.params` và chuyển đổi nó thành số nguyên.
        const id = parseInt(req.params.id, 10);
        // Thực hiện truy vấn SELECT để tìm một bài viết trong bảng 'dong_y_phat_phap' có ID khớp.
        const [rows] = await db.query(
            "SELECT * FROM dong_y_phat_phap WHERE id = ?",
            [id]
        );
        // Kiểm tra nếu không tìm thấy bài viết nào (mảng 'rows' rỗng).
        if (!rows.length)
            // Nếu không tìm thấy, gửi phản hồi lỗi 404 (Not Found) về client.
            return res.status(404).json({ error: "Không tìm thấy bài viết Đông y & Phật pháp" });
        // Nếu tìm thấy, gửi bài viết đầu tiên (phần tử 0) trong mảng về client.
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một bài viết Đông y & Phật pháp cụ thể từ cơ sở dữ liệu dựa trên slug (đường dẫn thân thiện) của nó.
 * @param {Object} req - Đối tượng request chứa slug của bài viết trong `req.params.slug`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getBySlug(req, res) {
    try {
        // Lấy slug từ `req.params`.
        const slug = req.params.slug;
        // Thực hiện truy vấn SELECT để tìm một bài viết trong bảng 'dong_y_phat_phap' có slug khớp.
        const [rows] = await db.query(
            "SELECT * FROM dong_y_phat_phap WHERE slug = ?",
            [slug]
        );
        // Kiểm tra nếu không tìm thấy bài viết nào.
        if (!rows.length)
            // Nếu không tìm thấy, gửi phản hồi lỗi 404 (Not Found) về client.
            return res.status(404).json({ error: "Không tìm thấy bài viết Đông y & Phật pháp" });
        // Nếu tìm thấy, gửi bài viết đầu tiên trong mảng về client.
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Tạo một bài viết Đông y & Phật pháp mới và lưu vào cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa thông tin bài viết cần tạo trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function create(req, res) {
    try {
        // Destructuring các trường 'title', 'slug', 'excerpt', 'image', 'content' từ `req.body`.
        const { title, slug, excerpt, image, content } = req.body;
        // Kiểm tra xem các trường bắt buộc 'title', 'slug', 'content' có bị thiếu không.
        if (!title || !slug || !content) {
            // Nếu thiếu, gửi phản hồi lỗi 400 (Bad Request) về client với thông báo cụ thể.
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn INSERT INTO để thêm một hàng mới vào bảng 'dong_y_phat_phap'.
        // Các giá trị được truyền dưới dạng mảng để ngăn chặn SQL injection.
        const [result] = await db.query(
            "INSERT INTO dong_y_phat_phap (title, slug, excerpt, image, content) VALUES (?, ?, ?, ?, ?)",
            [title, slug, excerpt, image, content]
        );
        // Gửi phản hồi thành công với trạng thái HTTP 201 (Created),
        // kèm theo ID của bài viết vừa được chèn và một thông báo.
        res.status(201).json({ id: result.insertId, message: "Tạo bài viết thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console.
        console.error(err);
        // Gửi lỗi server 500 về client.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Cập nhật thông tin của một bài viết Đông y & Phật pháp hiện có trong cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID bài viết trong `req.params.id` và thông tin cập nhật trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function update(req, res) {
    try {
        // Lấy ID của bài viết từ `req.params` và chuyển đổi nó thành số nguyên.
        const id = parseInt(req.params.id, 10);
        // Destructuring các trường thông tin cập nhật từ `req.body`.
        const { title, slug, excerpt, image, content } = req.body;
        // Kiểm tra các trường bắt buộc 'title', 'slug', 'content'.
        if (!title || !slug || !content) {
            // Nếu thiếu, gửi phản hồi lỗi 400 (Bad Request).
            return res.status(400).json({ error: "Thiếu trường bắt buộc: title, slug, content" });
        }
        // Thực hiện truy vấn UPDATE để cập nhật các cột của bài viết có ID khớp.
        const [result] = await db.query(
            "UPDATE dong_y_phat_phap SET title = ?, slug = ?, excerpt = ?, image = ?, content = ? WHERE id = ?",
            [title, slug, excerpt, image, content, id]
        );
        // Kiểm tra xem có hàng nào bị ảnh hưởng bởi truy vấn UPDATE không.
        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy bài viết với ID đã cho,
            // gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy bài viết để cập nhật" });
        }
        // Gửi phản hồi thành công nếu cập nhật hoàn tất.
        res.json({ message: "Cập nhật bài viết thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console.
        console.error(err);
        // Gửi lỗi server 500 về client.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Xóa một bài viết Đông y & Phật pháp khỏi cơ sở dữ liệu dựa trên ID của nó.
 * @param {Object} req - Đối tượng request chứa ID của bài viết cần xóa trong `req.params.id`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function remove(req, res) {
    try {
        // Lấy ID của bài viết từ `req.params` và chuyển đổi nó thành số nguyên.
        const id = parseInt(req.params.id, 10);
        // Thực hiện truy vấn DELETE để xóa bài viết có ID khớp.
        const [result] = await db.query("DELETE FROM dong_y_phat_phap WHERE id = ?", [id]);
        // Kiểm tra xem có hàng nào bị ảnh hưởng bởi truy vấn DELETE không.
        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy bài viết với ID đã cho,
            // gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy bài viết để xóa" });
        }
        // Gửi phản hồi thành công nếu xóa hoàn tất.
        res.json({ message: "Xóa bài viết thành công" });
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

// Xuất các hàm điều khiển để có thể sử dụng trong các module khác (ví dụ: trong định tuyến).
module.exports = { getAll, getById, getBySlug, create, update, remove };

