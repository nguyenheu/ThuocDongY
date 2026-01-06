require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
  try {
    console.log("🔍 Đang kiểm tra database 'btl'...\n");

    // Thiết lập kết nối đến cơ sở dữ liệu 'btl'
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost", 
      user: process.env.DB_USER || "root",       
      password: process.env.DB_PASS || "",       
      database: "btl",                       
    });

    console.log("✅ Kết nối database 'btl' thành công!\n");

    // Lấy danh sách tất cả các bảng trong database
    const [tables] = await conn.query("SHOW TABLES");
    console.log(`📋 Số bảng: ${tables.length}\n`);

    // Nếu có bảng trong database
    if (tables.length > 0) {
      console.log("📊 Danh sách bảng:");
      // Lặp qua từng bảng để kiểm tra số lượng bản ghi
      for (const table of tables) {
        const tableName = Object.values(table)[0]; // Lấy tên bảng từ kết quả truy vấn
        try {
          const [count] = await conn.query(`SELECT COUNT(*) as count FROM ${tableName}`);
          console.log(`   ✅ ${tableName}: ${count[0].count} records`);
        } catch (e) {
          console.log(`   ❌ ${tableName}: Lỗi khi đếm records`);
        }
      }

      // Định nghĩa các bảng quan trọng cần kiểm tra sự tồn tại
      const requiredTables = ["products", "categories", "news", "intro_sections", "banners"];
      console.log("\n🔍 Kiểm tra các bảng cần thiết:");
      // Lặp qua các bảng cần thiết và kiểm tra xem chúng có tồn tại không
      for (const table of requiredTables) {
        const exists = tables.some(t => Object.values(t)[0] === table);
        console.log(`   ${exists ? '✅' : '❌'} ${table}`); 
      }
    } else {
      console.log("⚠️  Database 'btl' trống, chưa có bảng nào!");
    }

    await conn.end(); 
  } catch (e) {
    console.error("❌ Lỗi:", e.message); 
    if (e.code === "ER_BAD_DB_ERROR") {
      console.error("\n💡 Database 'btl' không tồn tại hoặc không thể truy cập.");
    }
  }
})();

