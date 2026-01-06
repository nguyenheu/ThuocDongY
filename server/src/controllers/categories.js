const db = require("../config/db");

/**
 * Module điều khiển (Controller) cho việc quản lý các danh mục sản phẩm/bài viết (categories).
 * Bao gồm các hàm xử lý logic nghiệp vụ cho các thao tác CRUD (Create, Read, Update, Delete)
 * đối với dữ liệu danh mục trong cơ sở dữ liệu.
 */

/**
 * Lấy tất cả các danh mục từ cơ sở dữ liệu.
 * Sắp xếp theo ID tăng dần và tên danh mục tăng dần.
 * @param {Object} req - Đối tượng request từ client (không sử dụng trong hàm này).
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getAll(req, res) {
    try {
        // Thực hiện truy vấn SELECT để lấy tất cả các bản ghi từ bảng 'categories'.
        // Kết quả được sắp xếp theo cột 'id' tăng dần, sau đó theo cột 'name' tăng dần.
        const [rows] = await db.query(
            "SELECT * FROM categories ORDER BY id ASC, name ASC"
        );
        // Gửi danh sách các danh mục đã truy vấn được về client dưới dạng JSON.
        res.json(rows);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn hoặc xử lý,
        // ghi lỗi vào console để hỗ trợ debug.
        console.error(err);
        // Gửi một phản hồi lỗi với trạng thái HTTP 500 (Internal Server Error) về client,
        // kèm theo một thông báo lỗi JSON.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một danh mục cụ thể từ cơ sở dữ liệu dựa trên ID của nó.
 * @param {Object} req - Đối tượng request chứa ID của danh mục trong `req.params.id`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getById(req, res) {
    try {
        // Lấy ID từ `req.params` và chuyển đổi nó thành số nguyên.
        const id = parseInt(req.params.id, 10);
        // Thực hiện truy vấn SELECT để tìm một danh mục trong bảng 'categories' có ID khớp.
        const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
        // Kiểm tra nếu không tìm thấy danh mục nào (mảng 'rows' rỗng).
        if (!rows.length)
            // Nếu không tìm thấy, gửi phản hồi lỗi 404 (Not Found) về client.
            return res.status(404).json({ error: "Không tìm thấy danh mục" });
        // Nếu tìm thấy, gửi danh mục đầu tiên (phần tử 0) trong mảng về client.
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Lấy một danh mục cụ thể từ cơ sở dữ liệu dựa trên slug (đường dẫn thân thiện) của nó.
 * @param {Object} req - Đối tượng request chứa slug của danh mục trong `req.params.slug`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function getBySlug(req, res) {
    try {
        // Lấy slug từ `req.params`.
        const slug = req.params.slug;
        // Thực hiện truy vấn SELECT để tìm một danh mục trong bảng 'categories' có slug khớp.
        const [rows] = await db.query("SELECT * FROM categories WHERE slug = ?", [slug]);
        // Kiểm tra nếu không tìm thấy danh mục nào.
        if (!rows.length)
            // Nếu không tìm thấy, gửi phản hồi lỗi 404 (Not Found) về client.
            return res.status(404).json({ error: "Không tìm thấy danh mục" });
        // Nếu tìm thấy, gửi danh mục đầu tiên trong mảng về client.
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console và gửi lỗi server 500 về client.
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Tạo một danh mục mới và lưu vào cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa thông tin danh mục cần tạo trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function create(req, res) {
    try {
        // Destructuring các trường 'name', 'slug', 'description', 'image', 'order_index' từ `req.body`.
        // Gán giá trị mặc định cho 'description', 'image', 'order_index' nếu không được cung cấp.
        const { name, slug, description = "", image = "", order_index = 0 } = req.body;
        // Kiểm tra xem trường 'name' có bị thiếu không.
        if (!name) return res.status(400).json({ error: "Tên danh mục (name) là bắt buộc" });

        // Khởi tạo slug cuối cùng. Nếu slug được cung cấp, sử dụng nó; ngược lại, tạo từ tên.
        let finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-");
        // Chuẩn hóa slug để loại bỏ dấu tiếng Việt và ký tự đặc biệt, đảm bảo URL thân thiện.
        finalSlug = finalSlug
            .normalize("NFD") // Tách các ký tự có dấu thành ký tự cơ bản và dấu riêng biệt.
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu.
            .replace(/đ/g, "d") // Thay thế ký tự 'đ' bằng 'd'.
            .replace(/Đ/g, "D"); // Thay thế ký tự 'Đ' bằng 'D'.

        // Thực hiện truy vấn INSERT INTO để thêm một hàng mới vào bảng 'categories'.
        // Các giá trị được truyền dưới dạng mảng để ngăn chặn SQL injection.
        const [result] = await db.query(
            "INSERT INTO categories (name, slug, description, image, order_index) VALUES (?, ?, ?, ?, ?)",
            [name, finalSlug, description, image, order_index]
        );

        // Sau khi chèn thành công, thực hiện truy vấn SELECT để lấy toàn bộ thông tin
        // của danh mục vừa tạo dựa trên `insertId` được trả về từ truy vấn INSERT.
        const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [
            result.insertId,
        ]);
        // Gửi phản hồi thành công với trạng thái HTTP 201 (Created),
        // kèm theo thông tin đầy đủ của danh mục vừa tạo về client.
        res.status(201).json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console để debug.
        console.error(err);
        // Kiểm tra nếu lỗi MySQL có mã 'ER_DUP_ENTRY', tức là có sự trùng lặp giá trị cho một trường UNIQUE (ví dụ: slug).
        if (err.code === "ER_DUP_ENTRY") {
            // Gửi phản hồi lỗi 400 (Bad Request) về client với thông báo lỗi trùng slug.
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        // Đối với các loại lỗi khác, gửi lỗi server 500 (Internal Server Error) về client.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Cập nhật thông tin của một danh mục hiện có trong cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID danh mục trong `req.params.id` và thông tin cập nhật trong `req.body`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function update(req, res) {
    try {
        // Lấy ID của danh mục từ `req.params` và chuyển đổi nó thành số nguyên.
        const id = parseInt(req.params.id, 10);
        // Destructuring các trường thông tin cập nhật từ `req.body`.
        const { name, slug, description, image, order_index } = req.body;

        // Kiểm tra sự tồn tại của danh mục trong cơ sở dữ liệu trước khi tiến hành cập nhật.
        const [exist] = await db.query("SELECT id FROM categories WHERE id = ?", [id]);
        if (!exist.length)
            // Nếu không tìm thấy danh mục với ID đã cho, gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy danh mục để cập nhật" });

        // Khởi tạo mảng để chứa các phần của câu truy vấn UPDATE và các giá trị tương ứng.
        const updates = [];
        const values = [];

        // Thêm các trường vào câu truy vấn UPDATE nếu chúng được cung cấp trong request body.
        if (name !== undefined) {
            updates.push("name = ?");
            values.push(name);
        }
        if (slug !== undefined) {
            updates.push("slug = ?");
            values.push(slug);
        }
        if (description !== undefined) {
            updates.push("description = ?");
            values.push(description);
        }
        if (image !== undefined) {
            updates.push("image = ?");
            values.push(image);
        }
        if (order_index !== undefined) {
            updates.push("order_index = ?");
            values.push(order_index);
        }

        // Nếu không có trường nào được cung cấp để cập nhật (mảng 'updates' rỗng),
        // thì không cần thực hiện truy vấn UPDATE. Chỉ lấy và trả về danh mục hiện tại.
        if (updates.length === 0) {
            const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
            return res.json(rows[0]);
        }

        // Thêm ID vào cuối mảng giá trị để sử dụng trong điều kiện WHERE của truy vấn UPDATE.
        values.push(id);
        // Thực hiện truy vấn UPDATE động.
        await db.query(
            `UPDATE categories SET ${updates.join(", ")} WHERE id = ?`,
            values
        );

        // Sau khi cập nhật thành công, lấy lại toàn bộ thông tin của danh mục đã cập nhật
        // để trả về client, đảm bảo dữ liệu phản hồi là mới nhất.
        const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (err) {
        // Ghi lại lỗi vào console để debug.
        console.error(err);
        // Kiểm tra nếu lỗi MySQL có mã 'ER_DUP_ENTRY', tức là có sự trùng lặp giá trị cho một trường UNIQUE (ví dụ: slug).
        if (err.code === "ER_DUP_ENTRY") {
            // Gửi phản hồi lỗi 400 (Bad Request) về client với thông báo lỗi trùng slug.
            return res.status(400).json({ error: "Slug đã tồn tại" });
        }
        // Đối với các loại lỗi khác, gửi lỗi server 500 (Internal Server Error) về client.
        res.status(500).json({ error: "Lỗi server" });
    }
}

/**
 * Xóa một danh mục khỏi cơ sở dữ liệu dựa trên ID của nó.
 * Trước khi xóa, kiểm tra xem có sản phẩm nào thuộc danh mục này không.
 * @param {Object} req - Đối tượng request chứa ID của danh mục cần xóa trong `req.params.id`.
 * @param {Object} res - Đối tượng response gửi về client.
 * @returns {void} - Không trả về giá trị trực tiếp, gửi response qua `res`.
 */
async function remove(req, res) {
    try {
        // Lấy ID của danh mục từ `req.params` và chuyển đổi nó thành số nguyên.
        const id = parseInt(req.params.id, 10);

        // Thực hiện truy vấn để đếm số lượng sản phẩm liên quan đến danh mục này.
        const [products] = await db.query(
            "SELECT COUNT(*) as count FROM products WHERE category_id = ?",
            [id]
        );
        // Kiểm tra nếu có bất kỳ sản phẩm nào liên quan.
        if (products[0].count > 0) {
            // Nếu có sản phẩm, gửi phản hồi lỗi 400 (Bad Request) với thông báo không thể xóa.
            return res.status(400).json({
                error: "Không thể xóa danh mục này vì còn sản phẩm thuộc danh mục",
            });
        }

        // Nếu không có sản phẩm liên quan, thực hiện truy vấn DELETE để xóa danh mục có ID khớp.
        const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
        // Kiểm tra xem có hàng nào bị ảnh hưởng bởi truy vấn DELETE không.
        if (result.affectedRows === 0)
            // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy danh mục với ID đã cho,
            // gửi phản hồi lỗi 404 (Not Found).
            return res.status(404).json({ error: "Không tìm thấy danh mục để xóa" });
        // Gửi phản hồi thành công nếu xóa hoàn tất.
        res.json({ success: true, message: "Xóa danh mục thành công" });
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
