USE news_btl;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,       
  slug VARCHAR(255) UNIQUE,         
  description TEXT,                 
  image VARCHAR(255),              
  order_index INT DEFAULT 0,        
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category_id INT AFTER image,
ADD CONSTRAINT fk_product_category 
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

INSERT IGNORE INTO categories (id, name, slug, description, order_index) VALUES
(1, 'Thuốc ho', 'thuoc-ho', 'Các sản phẩm hỗ trợ điều trị ho, long đờm, bổ phế', 1),
(2, 'Tiêu hóa', 'tieu-hoa', 'Sản phẩm hỗ trợ hệ tiêu hóa, điều trị các bệnh về đại tràng', 2),
(3, 'Tim mạch', 'tim-mach', 'Sản phẩm hỗ trợ tim mạch, hoạt huyết, thông mạch', 3),
(4, 'Hô hấp', 'ho-hap', 'Sản phẩm điều trị các bệnh về hô hấp, hen suyễn', 4);

UPDATE products SET category_id = 1 WHERE category = 'Thuốc ho' OR category LIKE '%ho%';
UPDATE products SET category_id = 2 WHERE category = 'Tiêu hóa' OR category LIKE '%tiêu hóa%' OR category LIKE '%đại tràng%';
UPDATE products SET category_id = 3 WHERE category = 'Tim mạch' OR category LIKE '%tim%' OR category LIKE '%mạch%';
UPDATE products SET category_id = 4 WHERE category = 'Hô hấp' OR category LIKE '%hô hấp%' OR category LIKE '%hen%';
