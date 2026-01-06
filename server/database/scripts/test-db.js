require("dotenv").config();
const mysql = require("mysql2/promise");

async function testConnection() {
    console.log("🔍 Đang kiểm tra kết nối MySQL...\n");

    const config = {
        host: process.env.DB_HOST || "localhost",     
        user: process.env.DB_USER || "root",         
        password: process.env.DB_PASS || "",         
        database: process.env.DB_NAME || "news_btl", 
    };

    console.log("📋 Cấu hình kết nối:");
    console.log(`   Host: ${config.host}`);
    console.log(`   User: ${config.user}`);
    console.log(`   Database: ${config.database}`);
    console.log(`   Password: ${config.password ? "***" : "(trống)"}\n`); 

    try {
        const connection = await mysql.createConnection(config);
        console.log("✅ Kết nối MySQL thành công!\n");

        console.log("🔍 Đang kiểm tra database...");
        const [databases] = await connection.query("SHOW DATABASES");
        console.log(`✅ Tìm thấy ${databases.length} databases\n`);

        const dbExists = databases.some((db) => db.Database === config.database);
        if (!dbExists) {
            console.error(`❌ Database '${config.database}' không tồn tại!`);
            await connection.end(); 
            return; 
        }

        // Nếu database tồn tại, chọn database và kiểm tra các bảng
        await connection.query(`USE ${config.database}`);
        const [tables] = await connection.query("SHOW TABLES");
        console.log(`✅ Database '${config.database}' có ${tables.length} bảng:\n`);

        // Liệt kê các bảng nếu có
        if (tables.length === 0) {
            console.error("❌ Database trống! Chưa có bảng nào.");
        } else {
            tables.forEach((table) => {
                const tableName = Object.values(table)[0];
                console.log(`   - ${tableName}`);
            });

            console.log("\n📊 Số lượng records trong các bảng:");
            const tablesToCheck = [
                "categories",
                "products",
                "news",
                "intro_sections",
                "banners",
                "cam_nang",
                "bai_thuoc",
                "duoc_lieu",
                "dong_y_phat_phap",
            ];

            for (const table of tablesToCheck) {
                try {
                    const [rows] = await connection.query(`SELECT COUNT(*) as count FROM ${table}`);
                    const count = rows[0].count;
                    console.log(`   - ${table}: ${count} records`);
                } catch (err) {
                    console.log(`   - ${table}: ❌ Bảng không tồn tại hoặc lỗi khi truy vấn`);
                }
            }
        }

        await connection.end(); 
        console.log("\n✅ Kiểm tra hoàn tất!");
    } catch (err) {
        console.error("\n❌ Lỗi kết nối MySQL:");
        console.error(`   ${err.message}\n`);

        if (err.code === "ER_ACCESS_DENIED_ERROR") {
            console.error("💡 Giải pháp:");
            console.error("   - Kiểm tra lại username và password trong file .env");
            console.error("   - Đảm bảo user MySQL có quyền truy cập database\n");
        } else if (err.code === "ECONNREFUSED") {
            console.error("💡 Giải pháp:");
            console.error("   - Kiểm tra MySQL service đã được khởi động chưa");
            console.error("   - Windows: Mở Services và start MySQL");
            console.error("   - macOS: brew services start mysql");
            console.error("   - Linux: sudo systemctl start mysql\n");
        } else if (err.code === "ER_BAD_DB_ERROR") {
            console.error("💡 Giải pháp:");
            console.error(`   - Tạo database: CREATE DATABASE ${config.database};`);
            console.error(`   - Import dữ liệu: mysql -u root -p ${config.database} < seed.sql\n`);
        } else {
            console.error("💡 Kiểm tra:");
            console.error("   - File .env đã được tạo và cấu hình đúng chưa");
            console.error("   - MySQL đã được cài đặt chưa");
            console.error("   - Database đã được tạo chưa\n");
        }
    }
}

testConnection();

