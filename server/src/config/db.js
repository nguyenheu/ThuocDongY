const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost", 
  port: process.env.DB_PORT || 3306,       
  user: process.env.DB_USER || "root",       
  password: process.env.DB_PASS || "",       
  database: process.env.DB_NAME || "news_btl", 
  waitForConnections: true,                
  connectionLimit: 10,                     
  queueLimit: 0,                           
  enableKeepAlive: true,                   
  keepAliveInitialDelay: 0,                
};

const pool = mysql.createPool(dbConfig);

pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Kết nối MySQL thành công!");
    console.log(`📊 Database: ${dbConfig.database}`);
    console.log(`🔗 Host: ${dbConfig.host}`);
    connection.release(); 
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MySQL:");
    console.error("   - Kiểm tra MySQL đã được cài đặt và đang chạy chưa");
    console.error("   - Kiểm tra file .env có đúng cấu hình không");
    console.error("   - Kiểm tra database đã được tạo chưa (chạy seed.sql)");
    console.error(`   - Chi tiết lỗi: ${err.message}`);
  });

pool.on("connection", (connection) => {
  console.log(`🔌 Connection ${connection.threadId} được tạo`);
});

pool.on("error", (err) => {
  console.error("❌ MySQL Pool Error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.error("⚠️  Kết nối MySQL bị đóng. Đang thử kết nối lại...");
  }
});

module.exports = pool;