CREATE DATABASE IF NOT EXISTS news_btl CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE news_btl;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,       
  slug VARCHAR(255) UNIQUE,         -- đường dẫn thân thiện
  description TEXT,                
  image VARCHAR(255),               
  order_index INT DEFAULT 0,        -- Thứ tự hiển thị của danh mục
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,       
  slug VARCHAR(255) UNIQUE,         
  description TEXT,                 
  content TEXT,                     
  image VARCHAR(255),
  category_id INT,                 
  featured BOOLEAN DEFAULT FALSE,   -- sản phẩm nổi bật
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,      
  slug VARCHAR(255) UNIQUE,         
  excerpt TEXT,                     -- Đoạn trích/tóm tắt của bài viết
  content TEXT,                     
  image VARCHAR(255),              
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

-- Bảng 'intro_sections' lưu trữ các phần nội dung giới thiệu về công ty/ứng dụng.
CREATE TABLE IF NOT EXISTS intro_sections (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,      
  slug VARCHAR(255) UNIQUE,         
  content TEXT,                     
  image VARCHAR(255),               
  order_index INT DEFAULT 0,        
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Bảng 'cam_nang' lưu trữ các bài viết về cẩm nang sức khỏe.
CREATE TABLE IF NOT EXISTS cam_nang (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,      
  slug VARCHAR(255) UNIQUE,         
  excerpt TEXT,                    
  content TEXT,                     
  image VARCHAR(255),               
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng 'bai_thuoc' lưu trữ thông tin về các bài thuốc đông y.
CREATE TABLE IF NOT EXISTS bai_thuoc (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,      
  slug VARCHAR(255) UNIQUE,         
  excerpt TEXT,                     
  content TEXT,                     
  image VARCHAR(255),               
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng 'duoc_lieu' lưu trữ thông tin về các loại dược liệu.
CREATE TABLE IF NOT EXISTS duoc_lieu (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,       
  slug VARCHAR(255) UNIQUE,         
  excerpt TEXT,                     
  content TEXT,                     
  image VARCHAR(255),               
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS dong_y_phat_phap (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,      
  slug VARCHAR(255) UNIQUE,         
  excerpt TEXT,                     
  content TEXT,                     
  image VARCHAR(255),               
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS banners (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(255),               
  image VARCHAR(255) NOT NULL,      
  link VARCHAR(255),                
  order_index INT DEFAULT 0,        
  active BOOLEAN DEFAULT TRUE,      -- banner hoạt động
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu cho bảng 'categories'
INSERT INTO categories (name, slug, description, image, order_index) VALUES
('Thuốc ho', 'thuoc-ho', 'Các sản phẩm hỗ trợ điều trị ho, long đờm, bổ phế', '/images/category-ho.jpg', 1),
('Tiêu hóa', 'tieu-hoa', 'Sản phẩm hỗ trợ hệ tiêu hóa, điều trị các bệnh về đại tràng', '/images/category-tieuhoa.jpg', 2),
('Tim mạch', 'tim-mach', 'Sản phẩm hỗ trợ tim mạch, hoạt huyết, thông mạch', '/images/category-timmach.jpg', 3),
('Hô hấp', 'ho-hap', 'Sản phẩm điều trị các bệnh về hô hấp, hen suyễn', '/images/category-hohap.jpg', 4),
('Xương khớp', 'xuong-khop', 'Sản phẩm hỗ trợ xương khớp, giảm đau, tăng cường chức năng vận động', '/images/category-xuongkhop.jpg', 5),
('Thần kinh', 'than-kinh', 'Sản phẩm hỗ trợ thần kinh, giảm căng thẳng, cải thiện giấc ngủ', '/images/category-thankinh.jpg', 6);

-- Dữ liệu mẫu cho bảng 'products'
INSERT INTO products (name, slug, description, content, image, category_id, featured) VALUES
('TPBVSK Siro P/H', 'siro-ph', 'Dạng bào chế: Siro. Quy cách đóng gói: Hộp 1 lọ x120ml. Đối tượng sử dụng: Người bị ho khan, ho có đờm, ho do thay đổi thời tiết, đau rát họng.', 
'TPBVSK Siro P/H hỗ trợ bổ phế, giảm ho, giảm đờm, giảm đau rát họng. Sản phẩm được bào chế từ các dược liệu quý theo phương pháp truyền thống.', '/images/productSiro.jpg', 1, TRUE),
('Đại Tràng Hoàn P/H', 'dai-trang-hoan-ph', 'Dạng bào chế: Hoàn cứng. Quy cách: Hộp x 10 gói x 4gram. Chỉ định: Chữa viêm đại tràng mãn tính.', 
'Đại Tràng Hoàn P/H là sản phẩm đặc trị viêm đại tràng mãn tính, được nghiên cứu và phát triển dựa trên bài thuốc Đông y cổ truyền.', '/images/daiTrang.jpg', 2, TRUE),
('Long huyết P/H', 'long-huyet-ph', 'Dạng bào chế: Viên nang cứng. Quy cách đóng gói: Hộp 2 vỉ × 12 viên. Hoạt huyết, dưỡng tâm, thông mạch.', 
'Long huyết P/H được Bộ Y tế trao tặng danh hiệu "Ngôi sao thuốc Việt". Sản phẩm hỗ trợ hoạt huyết, dưỡng tâm, thông mạch, hỗ trợ tuần hoàn máu não.', '/images/longHuyet.jpg', 3, TRUE),
('Thuốc hen Phúc Hưng', 'thuoc-hen-phuc-hung', 'CÔNG DỤNG: Giáng khí, bình suyễn, ôn hóa đàm thấp. CHỈ ĐỊNH: Điều trị hen phế quản mãn tính.', 
'Thuốc hen Phúc Hưng là sản phẩm điều trị hiệu quả hen phế quản mãn tính, được nhiều bệnh nhân tin dùng.', '/images/productBeer.jpg', 4, FALSE),
('Xương khớp P/H', 'xuong-khop-ph', 'Dạng bào chế: Viên nén. Quy cách: Hộp 3 vỉ x 10 viên. Chỉ định: Hỗ trợ giảm đau nhức xương khớp, thoái hóa khớp.', 
'Sản phẩm xương khớp P/H giúp bổ sung dưỡng chất cho khớp, giảm đau và cải thiện chức năng vận động khớp hiệu quả.', '/images/productBeer.jpg', 5, TRUE),
('Hoạt Huyết Dưỡng Não P/H', 'hoat-huyet-duong-nao-ph', 'Dạng bào chế: Viên nang mềm. Quy cách: Hộp 3 vỉ x 10 viên. Chỉ định: Hỗ trợ hoạt huyết, tăng cường lưu thông máu não.', 
'Sản phẩm Hoạt Huyết Dưỡng Não P/H giúp cải thiện trí nhớ, giảm các triệu chứng đau đầu, chóng mặt do thiếu máu não.', '/images/hoatHuyet.jpg', 6, TRUE);

-- Dữ liệu mẫu cho bảng 'news'
INSERT INTO news (title, slug, excerpt, content, image) VALUES
('Cảm niệm mùa Vu Lan hiếu hạnh 2025', 'cam-niem-mua-vu-lan-2025', 
'Ngày Vu Lan, trong không gian tĩnh tại của Phúc Hưng, những người con lặng lẽ dâng chén trà thơm lên đấng sinh thành.', 
'Ngày Vu Lan là dịp để chúng ta tưởng nhớ công ơn cha mẹ, những người đã sinh thành và nuôi dưỡng ta. Trong không gian tĩnh tại của Phúc Hưng, chúng tôi cùng nhau dâng chén trà thơm, bày tỏ lòng biết ơn sâu sắc.', '/images/news1.jpg'),
('Thuốc Long huyết P/H được Bộ y tế trao tặng danh hiệu Ngôi sao thuốc Việt', 'long-huyet-ngoi-sao-thuoc-viet', 
'"Ngôi sao thuốc Việt" là danh hiệu danh giá và duy nhất dành cho các sản phẩm dược phẩm Việt Nam có chất lượng cao.', 
'Danh hiệu "Ngôi sao thuốc Việt" được Bộ Y tế trao tặng cho các sản phẩm dược phẩm có chất lượng cao, được người tiêu dùng tin tưởng. Long huyết P/H vinh dự nhận được danh hiệu này.', '/images/news2.jpg'),
('Đông dược Phúc Hưng trao tặng 400 suất quà cho các đối tượng người có công', 'trao-qua-nguoi-co-cong', 
'Nhân dịp kỷ niệm 78 năm ngày Thương binh Liệt sỹ 27/7, Đông dược Phúc Hưng đã trao tặng 400 suất quà cho các đối tượng người có công.', 
'Với truyền thống tương thân tương ái, Đông dược Phúc Hưng luôn đồng hành cùng cộng đồng, đặc biệt là các đối tượng người có công với cách mạng.', '/images/news3.jpg'),
('Lợi ích bất ngờ của trà xanh đối với sức khỏe', 'loi-ich-tra-xanh', 
'Trà xanh không chỉ là thức uống giải khát mà còn mang lại nhiều lợi ích tuyệt vời cho sức khỏe nhờ các chất chống oxy hóa.', 
'Trà xanh từ lâu đã được biết đến với những công dụng thần kỳ đối với sức khỏe con người. Giàu chất chống oxy hóa EGCG, trà xanh giúp ngăn ngừa lão hóa, hỗ trợ giảm cân, cải thiện chức năng não và giảm nguy cơ mắc một số bệnh mãn tính.', '/images/news4.jpg'),
('Yoga: Phương pháp cải thiện sức khỏe toàn diện', 'yoga-cai-thien-suc-khoe', 
'Yoga là một bộ môn luyện tập cổ xưa có nguồn gốc từ Ấn Độ, kết hợp giữa các tư thế thể chất, kỹ thuật thở và thiền định.', 
'Yoga không chỉ giúp tăng cường sức mạnh, sự linh hoạt của cơ thể mà còn cải thiện sức khỏe tinh thần, giảm căng thẳng và tăng cường sự tập trung.', '/images/news5.jpg');

-- Dữ liệu mẫu cho bảng 'intro_sections'
INSERT INTO intro_sections (title, slug, content, image, order_index) VALUES
("Giới thiệu chung", "gioi-thieu-chung", 
"Công ty TNHH Đông Dược Phúc Hưng (gọi tắt là Đông Dược Phúc Hưng), tiền thân là tổ hợp tác sản xuất, kinh doanh dược liệu được thành lập năm 1993. Với hơn 30 năm hình thành và phát triển, Đông Dược Phúc Hưng đã trở thành một trong những đơn vị uy tín trong lĩnh vực sản xuất và kinh doanh thuốc Đông y tại Việt Nam. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, an toàn và hiệu quả, góp phần nâng cao sức khỏe cộng đồng.", 
"/images/introCommon.jpg", 1),
("Lịch sử hình thành và phát triển", "lich-su-hinh-thanh", 
"Hành trình 30 năm hình thành và phát triển của Đông Dược Phúc Hưng là sự kết tinh của tâm huyết, kinh nghiệm và không ngừng đổi mới. Từ những bước khởi đầu khiêm tốn, chúng tôi đã vươn lên trở thành một thương hiệu uy tín, được hàng triệu người tiêu dùng tin tưởng. Chúng tôi luôn tự hào giữ gìn và phát huy các giá trị truyền thống của y học cổ truyền Việt Nam, đồng thời ứng dụng khoa học công nghệ hiện đại vào sản xuất để tạo ra những sản phẩm chất lượng vượt trội.", 
"/images/introHistory.jpg", 2),
("Giá trị - Triết lý", "gia-tri-triet-ly", 
"Chúng tôi luôn tôn trọng và phát huy các dạng bào chế truyền thống cao đơn hoàn tán, kết hợp với nghiên cứu hiện đại để mang đến sản phẩm chất lượng cao cho người tiêu dùng. Triết lý kinh doanh của chúng tôi đặt sức khỏe và lợi ích của khách hàng lên hàng đầu. Mỗi sản phẩm của Phúc Hưng đều là sự kết tinh của tinh hoa y học cổ truyền và công nghệ tiên tiến, đảm bảo an toàn, hiệu quả và đáng tin cậy.", 
"/images/introValue.jpg", 3),
("Trách nhiệm cộng đồng", "trach-nhiem-cong-dong", 
"Song hành với phát triển hoạt động kinh doanh, với truyền thống tương thân tương ái, Đông Dược Phúc Hưng luôn hướng tới cộng đồng, tham gia các hoạt động từ thiện, khám chữa bệnh miễn phí. Chúng tôi tin rằng, một doanh nghiệp phát triển bền vững cần phải gắn liền với trách nhiệm xã hội, chia sẻ những giá trị tốt đẹp đến với mọi người.", 
"/images/introPublic.jpg", 4);

-- Dữ liệu mẫu cho bảng 'cam_nang'
INSERT INTO cam_nang (title, slug, excerpt, content, image) VALUES
('Mùa Thu - Thời điểm vàng để dưỡng phổi', 'mua-thu-duong-phoi', 
'Mới chớm thu, khí trời vẫn còn vương lại cái oi nồng của mùa hạ, ban ngày nắng vẫn hanh hanh, nhưng sáng sớm và chiều tối đã bắt đầu có hơi se lạnh. Đây là thời điểm lý tưởng để chăm sóc sức khỏe hệ hô hấp.', 
'Mùa thu là thời điểm lý tưởng để dưỡng phổi theo quan niệm Đông y. Khí trời mát mẻ, hanh khô, phù hợp với việc bổ phế, nhuận phế, tăng cường sức đề kháng của hệ hô hấp. Để bảo vệ phổi, nên ăn nhiều thực phẩm màu trắng như củ cải, lê, ngân nhĩ; uống đủ nước; tránh các thực phẩm cay nóng; và tập thể dục đều đặn.', '/images/productSiro.jpg'),
('Tỳ vị suy yếu: Những tín hiệu cảnh báo qua gương mặt và ba nguyên tắc khôi phục căn bản', 'ty-vi-suy-yeu', 
'Trong học thuyết Đông y, tỳ vị là trung tâm chuyển hóa dinh dưỡng, nơi "vận hóa thủy cốc" - chuyển hóa thức ăn thành tinh chất nuôi dưỡng cơ thể. Khi tỳ vị suy yếu, cơ thể sẽ xuất hiện nhiều vấn đề.', 
'Tỳ vị suy yếu có thể biểu hiện qua nhiều dấu hiệu trên gương mặt như sắc mặt vàng, môi nhợt, mắt thâm quầng. Ba nguyên tắc khôi phục: ăn uống điều độ, tránh các thực phẩm lạnh bụng, hạn chế đồ ăn nhiều dầu mỡ; nghỉ ngơi đầy đủ, tránh căng thẳng; và sử dụng các vị thuốc bổ tỳ vị như Bạch truật, Phục linh, Hoài sơn.', '/images/productBeer.jpg'),
('Lợi ích của châm cứu trong điều trị đau nhức xương khớp', 'loi-ich-cham-cuu-xuong-khop', 
'Châm cứu là một phương pháp điều trị truyền thống của Đông y, được ứng dụng rộng rãi trong việc giảm đau và cải thiện các bệnh lý về xương khớp.', 
'Châm cứu giúp kích thích các huyệt đạo, điều hòa khí huyết, giảm viêm và giảm đau hiệu quả trong các bệnh lý như thoái hóa khớp, viêm khớp dạng thấp, đau lưng, đau vai gáy. Đây là một phương pháp an toàn và ít tác dụng phụ.', '/images/productSiro.jpg');

-- Dữ liệu mẫu cho bảng 'bai_thuoc'
INSERT INTO bai_thuoc (title, slug, excerpt, content, image) VALUES
('Quy tỳ hoàn (Quy tỳ thang) - Bài thuốc Đông y giúp ăn ngon, ngủ ngon', 'quy-ty-hoan', 
'Trên lâm sàng bệnh nhân đến với các phòng khám y học cổ truyền với các triệu chứng mất ngủ, ăn không ngon, suy nhược cơ thể thường được chỉ định sử dụng Quy tỳ hoàn. Bài thuốc này có tác dụng bổ ích khí huyết, kiện tỳ, dưỡng tâm, an thần.', 
'Quy tỳ hoàn là bài thuốc cổ truyền nổi tiếng, có tác dụng bổ tỳ, dưỡng tâm, an thần, giúp ăn ngon, ngủ ngon, cải thiện tình trạng suy nhược cơ thể. Bài thuốc gồm các vị: Nhân sâm, Bạch truật, Hoàng kỳ, Long nhãn, Táo nhân, Phục thần, Viễn chí, Mộc hương, Chích thảo, Sinh khương, Đại táo. Quy tỳ hoàn đặc biệt hiệu quả với người khí huyết lưỡng hư, tỳ hư, tâm huyết hư.', '/images/daiTrang.jpg'),
('Đương quy bổ huyết thang - Nghiên cứu về dược học, dược lý và ứng dụng lâm sàng', 'duong-quy-bo-huyet-thang', 
'Trên lâm sàng, Đương quy bổ huyết thang được chứng minh hiệu quả rõ rệt trong cải thiện thiếu máu, suy nhược cơ thể, da xanh xao, hoa mắt chóng mặt. Đây là bài thuốc bổ huyết kinh điển.', 
'Đương quy bổ huyết thang là bài thuốc bổ huyết kinh điển trong Đông y, được sử dụng rộng rãi trong điều trị thiếu máu, suy nhược, da xanh xao, mệt mỏi. Bài thuốc gồm hai vị chính là Đương quy và Hoàng kỳ, với tỷ lệ và cách dùng đặc biệt để tối ưu hóa tác dụng bổ huyết. Các nghiên cứu hiện đại cũng đã chứng minh hiệu quả dược lý của bài thuốc này.', '/images/hoatHuyet.jpg'),
('Bài thuốc Lục Vị Địa Hoàng Hoàn - Bổ thận âm, điều trị suy nhược cơ thể', 'luc-vi-dia-hoang-hoan', 
'Lục Vị Địa Hoàng Hoàn là một trong những bài thuốc bổ âm kinh điển trong Đông y, thường được dùng để bổ thận âm, điều trị các chứng âm hư.', 
'Bài thuốc Lục Vị Địa Hoàng Hoàn gồm Thục địa, Sơn thù, Hoài sơn, Trạch tả, Phục linh, Đơn bì. Bài thuốc này có tác dụng bổ thận âm, thanh hư nhiệt, được ứng dụng rộng rãi trong các trường hợp suy nhược cơ thể, chóng mặt ù tai, đau lưng mỏi gối do thận âm hư.', '/images/longHuyet.jpg');

-- Dữ liệu mẫu cho bảng 'duoc_lieu'
INSERT INTO duoc_lieu (name, slug, excerpt, content, image) VALUES
('Ngân nhĩ - Vị thuốc nhuận phế tư âm, bổ mà không hàn', 'ngan-nhi', 
'Ngân nhĩ từ xưa đã là bảo vật dưỡng bổ và dưỡng nhan trong văn hóa ẩm thực - y học. Vị thuốc này không chỉ có tác dụng bổ dưỡng mà còn nhuận phế, tư âm, giúp tăng cường sức khỏe và sắc đẹp.', 
'Ngân nhĩ (nấm tuyết) là vị thuốc quý trong Đông y, có tác dụng nhuận phế, tư âm, bổ mà không hàn, rất phù hợp cho người có thể chất hư nhược, phế âm hư. Ngân nhĩ giúp cải thiện chức năng hô hấp, dưỡng da, làm đẹp, và tăng cường hệ miễn dịch. Thường được dùng trong các món ăn, chè dưỡng nhan.', '/images/news1.jpg'),
('Bạch truật - Vị thuốc mộc mạc nhưng là "quản gia" của Tỳ vị', 'bach-truat', 
'Trong Đông y, có những vị thuốc không hề rực rỡ, chẳng gây ấn tượng khi nhìn bằng mắt, nhưng lại đóng vai trò vô cùng quan trọng trong việc điều hòa cơ thể. Bạch truật là một trong số đó.', 
'Bạch truật được ví như "quản gia" của tỳ vị, có tác dụng kiện tỳ, táo thấp, lợi thủy, là vị thuốc không thể thiếu trong các bài thuốc bổ tỳ vị. Nó giúp cải thiện tiêu hóa, giảm đầy bụng, tiêu chảy, và tăng cường hấp thu dinh dưỡng. Rất hữu ích cho người tỳ vị hư nhược.', '/images/news2.jpg'),
('Đan sâm - Bảo vật hoạt huyết, dưỡng tâm, thông mạch', 'dan-sam', 
'Từ thời "Thần Nông bản thảo kinh", Đan sâm đã được xếp loại thượng phẩm, nghĩa là vị thuốc quý, có tác dụng tốt và an toàn. Đan sâm có màu đỏ, vị đắng, tính hàn.', 
'Đan sâm là vị thuốc hoạt huyết, dưỡng tâm, thông mạch, được sử dụng rộng rãi trong điều trị các bệnh tim mạch, tuần hoàn máu kém. Nó giúp cải thiện vi tuần hoàn, giảm cholesterol, và bảo vệ tim mạch. Thường dùng trong các bài thuốc trị đau thắt ngực, kinh nguyệt không đều.', '/images/news3.jpg'),
('Hoài sơn (Củ mài) - Vị thuốc bổ tỳ vị, ích khí dưỡng âm', 'hoai-son', 
'Hoài sơn, hay củ mài, là một vị thuốc quen thuộc trong cả Đông y và ẩm thực. Nó không chỉ là một loại thực phẩm bổ dưỡng mà còn là một vị thuốc quý.', 
'Hoài sơn có vị ngọt, tính bình, quy kinh tỳ, phế, thận. Nó có tác dụng bổ tỳ vị, ích khí dưỡng âm, cố tinh, chỉ tả. Hoài sơn thường được dùng để điều trị các chứng tỳ vị hư nhược, tiêu chảy mãn tính, suy nhược cơ thể, tiểu đường. Có thể dùng làm thực phẩm hoặc chế biến thành thuốc.', '/images/news4.jpg');

-- Dữ liệu mẫu cho bảng 'dong_y_phat_phap'
INSERT INTO dong_y_phat_phap (title, slug, excerpt, content, image) VALUES
('Sự vận hành của thân và tâm', 'su-van-hanh-than-tam', 
'Tâm cũng như thân của chúng ta, nếu trong đó có những vùng bế tắc, thì ta sẽ sinh bệnh. Ban đầu chúng ta thường chưa thấy bệnh, nhưng nếu có một sự thiếu hụt năng lượng ở tâm, dần dần nó sẽ biểu hiện ra thân dưới dạng bệnh tật. Hiểu rõ sự tương quan này giúp chúng ta chăm sóc sức khỏe một cách toàn diện hơn.', 
'Trong Đông y và Phật pháp, thân và tâm luôn có mối liên hệ mật thiết. Khi tâm có những bế tắc, lo âu, phiền muộn, thân cũng sẽ phản ánh qua các triệu chứng bệnh lý như đau đầu, mất ngủ, rối loạn tiêu hóa. Ngược lại, một thân thể khỏe mạnh cũng là nền tảng để tâm được an lạc. Việc thực hành thiền định, chánh niệm giúp cân bằng thân và tâm, từ đó đạt được sức khỏe toàn diện và an lạc trong cuộc sống.', '/images/longHuyet.jpg'),
('Y học và chia sẻ của Thiền sư Thích Nhất Hạnh', 'y-hoc-thich-nhat-hanh', 
'Dưới góc nhìn của Phật Pháp, thiền sư Thích Nhất Hạnh đã có những chia sẻ sâu sắc về mối liên hệ giữa y học và tâm linh. Ông nhấn mạnh tầm quan trọng của việc chữa lành từ gốc rễ.', 
'Thiền sư Thích Nhất Hạnh đã chỉ ra rằng, y học không chỉ là chữa bệnh về thể chất, mà còn phải chữa lành cả tâm hồn. Ông khuyến khích các y bác sĩ và bệnh nhân thực hành chánh niệm, biết lắng nghe cơ thể và tâm trí. Sự kết hợp giữa y học hiện đại và các phương pháp chữa lành từ bi của Phật giáo có thể mang lại hiệu quả vượt trội trong việc điều trị và phòng ngừa bệnh tật, giúp con người sống khỏe mạnh và hạnh phúc hơn.', '/images/daiTrang.jpg'),
('Chế độ ăn uống theo quan điểm Phật giáo và lợi ích sức khỏe', 'che-do-an-phat-giao', 
'Chế độ ăn uống trong Phật giáo không chỉ dừng lại ở việc kiêng khem mà còn là một triết lý sống, mang lại nhiều lợi ích cho sức khỏe thể chất và tinh thần.', 
'Theo quan điểm Phật giáo, việc ăn uống cần thanh đạm, không sát sinh, và giữ chánh niệm trong từng bữa ăn. Chế độ ăn chay, ăn ít thịt đỏ, tăng cường rau xanh, ngũ cốc nguyên hạt giúp cơ thể nhẹ nhàng, thanh lọc, giảm nguy cơ mắc các bệnh tim mạch, tiểu đường, ung thư. Ngoài ra, việc ăn uống chánh niệm giúp chúng ta nhận biết rõ hơn về thức ăn, cảm nhận hương vị và biết ơn nguồn gốc của chúng, từ đó nuôi dưỡng lòng từ bi và sự bình an trong tâm hồn.', '/images/hoatHuyet.jpg');

-- Dữ liệu mẫu cho bảng 'banners'
INSERT INTO banners (title, image, link, order_index, active) VALUES
("Siro P/H - Hỗ trợ bổ phế, giảm ho", "/images/productSiro.jpg", "/thuoc-dong-y/siro-ph", 1, TRUE),
("Đại Tràng Hoàn P/H - Đặc trị viêm đại tràng mãn tính", "/images/daiTrang.jpg", "/thuoc-dong-y/dai-trang-hoan-ph", 2, TRUE),
("Khám phá thế giới dược liệu quý", "/images/longHuyet.jpg", "/duoc-lieu-quy", 3, TRUE),
("Cẩm Nang Sức Khỏe - Kiến thức y học bổ ích", "/images/camnang-banner.jpg", "/cam-nang-suc-khoe", 4, TRUE),
("Đông y & Phật pháp - Lối sống an lành", "/images/introBG.jpg", "/dong-y-phat-phap", 5, TRUE);
