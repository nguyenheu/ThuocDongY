require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

(async () => {
  try {
    console.log("🔧 Đang tạo database 'news_btl'...\n");

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost", 
      user: process.env.DB_USER || "root",       
      password: process.env.DB_PASS || "",       
    });

    console.log("✅ Kết nối MySQL thành công!\n");

    const dbName = process.env.DB_NAME || "news_btl";

    console.log(`🗑️ Đang xóa database cũ '${dbName}' (nếu có)...`);
    await conn.query(`DROP DATABASE IF EXISTS ${dbName}`);
    console.log(`✅ Database cũ '${dbName}' đã được xóa (nếu có).`);

    console.log(`📦 Đang tạo database mới '${dbName}'...`);
    await conn.query(`CREATE DATABASE ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
    console.log(`✅ Database mới '${dbName}' đã được tạo!\n`);

    // Chọn database mới tạo để thực hiện các truy vấn tiếp theo
    await conn.query(`USE ${dbName}`);
    console.log(`📂 Đang sử dụng database '${dbName}'...\n`);

    // Xử lý file seed.sql để tạo bảng và chèn dữ liệu ban đầu
    const seedPath = path.join(__dirname, "seed.sql");
    // Kiểm tra xem file seed.sql có tồn tại không
    if (fs.existsSync(seedPath)) {
      console.log("📄 Đang đọc file seed.sql...");
      const seedSQL = fs.readFileSync(seedPath, "utf8");

      // Tách các câu lệnh SQL trong file, loại bỏ các câu lệnh tạo/xóa database và USE vì đã xử lý
      const statements = seedSQL
        .split(";")
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.toUpperCase().startsWith("CREATE DATABASE") && !s.toUpperCase().startsWith("USE") && !s.toUpperCase().startsWith("DROP DATABASE"));

      console.log(`🔄 Đang chạy ${statements.length} câu lệnh SQL...\n`);

      // Thực thi từng câu lệnh SQL
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        if (statement.trim()) {
          try {
            await conn.query(statement);
            // Cố gắng tìm tên bảng được tạo hoặc chèn dữ liệu để in thông báo rõ ràng
            const createTableMatch = statement.match(/CREATE TABLE (?:IF NOT EXISTS )?`?(\w+)`?/i);
            const insertIntoMatch = statement.match(/INSERT INTO `?(\w+)`?/i);

            if (createTableMatch) {
              console.log(`   ✅ Đã tạo bảng: ${createTableMatch[1]}`);
            } else if (insertIntoMatch) {
              console.log(`   ➕ Đã chèn dữ liệu vào bảng: ${insertIntoMatch[1]}`);
            }
          } catch (err) {
            if (!err.message.includes("already exists") && err.code !== "ER_DUP_ENTRY") {
              console.log(`   ⚠️  Lỗi: ${err.message} (SQL: ${statement.substring(0, 50)}...)`);
            }
          }
        }
      }

      console.log("\n✅ Đã import schema và dữ liệu từ seed.sql!\n");
    } else {
      console.log("⚠️  Không tìm thấy file seed.sql\n"); 
    }

    const [tables] = await conn.query("SHOW TABLES");
    console.log(`📊 Tổng số bảng: ${tables.length}`);
    if (tables.length > 0) {
      console.log("\n📋 Danh sách bảng và số lượng records:");
      for (const table of tables) {
        const tableName = Object.values(table)[0];
        const [count] = await conn.query(`SELECT COUNT(*) as count FROM ${tableName}`);
        console.log(`   - ${tableName}: ${count[0].count} records`);
      }
    }

    await conn.end(); // Đóng kết nối cơ sở dữ liệu
    console.log("\n🎉 Hoàn tất! Database đã sẵn sàng sử dụng!");
  } catch (e) {
    console.error("\n❌ Lỗi:", e.message); 
    if (e.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("\n💡 Kiểm tra lại username và password trong file .env");
    } else if (e.code === "ECONNREFUSED") {
      console.error("\n💡 MySQL chưa chạy. Hãy khởi động MySQL service.");
    } else if (e.sqlMessage) {
      console.error("\n💡 Lỗi SQL:", e.sqlMessage);
    }
    process.exit(1);
  }
})();

