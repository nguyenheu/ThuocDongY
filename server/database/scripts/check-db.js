require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
  try {
    console.log("🔍 Đang kiểm tra MySQL...\n");

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost", 
      user: process.env.DB_USER || "root",       
      password: process.env.DB_PASS || "",       
    });

    console.log("✅ Kết nối MySQL thành công!\n");

    // Lấy danh sách tất cả các database hiện có trên server MySQL
    const [dbs] = await conn.query("SHOW DATABASES");
    console.log("📊 Các database hiện có:");
    // In ra tên của từng database
    dbs.forEach((db) => console.log("   -", db.Database));

    const targetDb = process.env.DB_NAME || "news_btl";
    // Kiểm tra xem database có tồn tại không
    const dbExists = dbs.some((db) => db.Database === targetDb);

    console.log(`\n🎯 Database mục tiêu: ${targetDb}`);
    if (dbExists) {
      console.log("✅ Database đã tồn tại!");

      // Chọn database mục tiêu để hiển thị các bảng bên trong
      await conn.query(`USE ${targetDb}`);
      const [tables] = await conn.query("SHOW TABLES");
      console.log(`\n📋 Số bảng: ${tables.length}`);
      // Nếu có bảng, liệt kê tên các bảng
      if (tables.length > 0) {
        tables.forEach((table) => {
          const tableName = Object.values(table)[0];
          console.log(`   - ${tableName}`);
        });
      }
    } else {
      console.log("❌ Database chưa tồn tại!");
    }

    await conn.end(); 
  } catch (e) {
    console.error("❌ Lỗi:", e.message); 
    if (e.code === "ECONNREFUSED") {
      console.error("\n💡 MySQL chưa chạy. Hãy khởi động MySQL service.");
    }
  }
})();

