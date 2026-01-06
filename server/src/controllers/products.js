// Import module kết nối cơ sở dữ liệu
const db = require("../config/db");

/**
 * Các hàm điều khiển cho việc quản lý sản phẩm (CRUD).
 */

/**
 * Lấy tất cả các sản phẩm từ cơ sở dữ liệu.
 * Hỗ trợ lọc theo sản phẩm nổi bật (featured) và danh mục (category_id).
 * @param {Object} req - Đối tượng request từ client, chứa query params (featured, category_id).
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getAll(req, res) {
  try {
    // Lấy giá trị của query param 'featured', chuyển đổi thành boolean
    const featured = req.query.featured === "true";
    // Lấy giá trị của query param 'category_id'
    const categoryId = req.query.category_id;

    // Xây dựng câu truy vấn SQL cơ bản với JOIN tới bảng categories để lấy thông tin danh mục
    let query = `SELECT p.id, p.name as title, p.slug, p.description as excerpt, 
      p.image, p.featured, p.created_at, 
      c.id as category_id, c.name as category_name, c.slug as category_slug
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id`;

    // Mảng chứa các điều kiện lọc (WHERE clauses)
    const conditions = [];
    // Nếu có query param 'featured' là true, thêm điều kiện lọc sản phẩm nổi bật
    if (featured) {
      conditions.push("p.featured = TRUE");
    }
    // Nếu có query param 'category_id', thêm điều kiện lọc theo ID danh mục
    if (categoryId) {
      conditions.push(`p.category_id = ${parseInt(categoryId, 10)}`);
    }

    // Nếu có bất kỳ điều kiện lọc nào, thêm WHERE clause vào câu truy vấn
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Thêm ORDER BY clause để sắp xếp sản phẩm (nổi bật trước, sau đó theo thời gian tạo mới nhất)
    query += " ORDER BY p.featured DESC, p.created_at DESC";
    // Thực hiện truy vấn cơ sở dữ liệu
    const [rows] = await db.query(query);
    // Gửi danh sách sản phẩm về client dưới dạng JSON
    res.json(rows);
  } catch (err) {
    // Ghi lại lỗi vào console và gửi lỗi server 500 về client
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
}

/**
 * Lấy một sản phẩm theo ID.
 * @param {Object} req - Đối tượng request chứa ID của sản phẩm trong params.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getById(req, res) {
  try {
    // Lấy ID từ params và chuyển đổi sang số nguyên
    const id = parseInt(req.params.id, 10);
    // Thực hiện truy vấn để lấy sản phẩm theo ID, bao gồm thông tin danh mục
    const [rows] = await db.query(
      `SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [id]
    );
    // Nếu không tìm thấy sản phẩm, trả về lỗi 404
    if (!rows.length)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    // Gửi sản phẩm tìm được về client
    res.json(rows[0]);
  } catch (err) {
    // Ghi lại lỗi vào console và gửi lỗi server 500 về client
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
}

/**
 * Lấy một sản phẩm theo slug (đường dẫn thân thiện).
 * @param {Object} req - Đối tượng request chứa slug của sản phẩm trong params.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function getBySlug(req, res) {
  try {
    // Lấy slug từ params
    const slug = req.params.slug;
    // Thực hiện truy vấn để lấy sản phẩm theo slug, bao gồm thông tin danh mục
    const [rows] = await db.query(
      `SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.slug = ?`,
      [slug]
    );
    // Nếu không tìm thấy sản phẩm, trả về lỗi 404
    if (!rows.length)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    // Gửi sản phẩm tìm được về client
    res.json(rows[0]);
  } catch (err) {
    // Ghi lại lỗi vào console và gửi lỗi server 500 về client
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
}

/**
 * Tạo một sản phẩm mới.
 * @param {Object} req - Đối tượng request chứa thông tin sản phẩm cần tạo.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function create(req, res) {
  try {
    // Lấy các trường thông tin từ body của request, gán giá trị mặc định nếu không có
    const {
      name,
      slug,
      description = "",
      content = "",
      image = "",
      category_id = null,
      featured = false,
    } = req.body;
    // Kiểm tra trường 'name' bắt buộc
    if (!name) return res.status(400).json({ error: "name là bắt buộc" });

    // Tạo slug nếu chưa được cung cấp, chuẩn hóa slug để loại bỏ dấu và ký tự đặc biệt
    let finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-");
    finalSlug = finalSlug
      .normalize("NFD") // Tách các ký tự có dấu thành ký tự cơ bản và dấu riêng biệt
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
      .replace(/đ/g, "d") // Thay thế 'đ' bằng 'd'
      .replace(/Đ/g, "D"); // Thay thế 'Đ' bằng 'D'

    // Thực hiện truy vấn INSERT để thêm sản phẩm mới vào cơ sở dữ liệu
    const [result] = await db.query(
      "INSERT INTO products (name, slug, description, content, image, category_id, featured) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, finalSlug, description, content, image, category_id, featured]
    );

    // Lấy thông tin sản phẩm vừa tạo (bao gồm cả thông tin danh mục) để trả về client
    const [rows] = await db.query(
      `SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [result.insertId]
    );
    // Gửi phản hồi thành công với thông tin sản phẩm vừa tạo
    res.status(201).json(rows[0]);
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
 * Cập nhật thông tin của một sản phẩm hiện có.
 * @param {Object} req - Đối tượng request chứa ID sản phẩm và thông tin cập nhật.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function update(req, res) {
  try {
    // Lấy ID của sản phẩm từ tham số URL và chuyển đổi sang số nguyên
    const id = parseInt(req.params.id, 10);
    // Lấy các trường thông tin cập nhật từ body của request
    const {
      name,
      slug,
      description,
      content,
      image,
      category_id,
      featured,
    } = req.body;

    // Kiểm tra sự tồn tại của sản phẩm trước khi cập nhật
    const [exist] = await db.query("SELECT id FROM products WHERE id = ?", [
      id,
    ]);
    if (!exist.length)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

    // Xây dựng câu truy vấn UPDATE động dựa trên các trường được cung cấp
    const updates = [];
    const values = [];

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
    if (content !== undefined) {
      updates.push("content = ?");
      values.push(content);
    }
    if (image !== undefined) {
      updates.push("image = ?");
      values.push(image);
    }
    if (category_id !== undefined) {
      updates.push("category_id = ?");
      values.push(category_id);
    }
    if (featured !== undefined) {
      updates.push("featured = ?");
      values.push(featured);
    }

    // Nếu không có trường nào được cung cấp để cập nhật, trả về sản phẩm hiện tại
    if (updates.length === 0) {
      const [rows] = await db.query(
        `SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug
         FROM products p 
         LEFT JOIN categories c ON p.category_id = c.id 
         WHERE p.id = ?`,
        [id]
      );
      return res.json(rows[0]);
    }

    values.push(id);
    // Thực hiện truy vấn UPDATE để cập nhật thông tin sản phẩm
    await db.query(
      `UPDATE products SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    // Lấy thông tin sản phẩm đã cập nhật (bao gồm cả thông tin danh mục) để trả về client
    const [rows] = await db.query(
      `SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [id]
    );
    res.json(rows[0]);
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
 * Xóa một sản phẩm khỏi cơ sở dữ liệu.
 * @param {Object} req - Đối tượng request chứa ID của sản phẩm cần xóa.
 * @param {Object} res - Đối tượng response gửi về client.
 */
async function remove(req, res) {
  try {
    // Lấy ID của sản phẩm từ tham số URL và chuyển đổi sang số nguyên
    const id = parseInt(req.params.id, 10);
    // Thực hiện truy vấn DELETE để xóa sản phẩm
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    // Nếu không có hàng nào bị ảnh hưởng, tức là không tìm thấy sản phẩm
    if (result.affectedRows === 0) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    // Gửi phản hồi thành công
    res.json({ success: true });
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