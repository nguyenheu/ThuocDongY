import axiosClient from './axiosClient';

const productService = {
  // Lấy tất cả sản phẩm (có thể truyền params để phân trang/lọc)
  getAll: (params) => {
    return axiosClient.get('/products', { params });
  },

  // Lấy chi tiết sản phẩm theo Slug (cho trang chi tiết)
  getBySlug: (slug) => {
    return axiosClient.get(`/products/slug/${slug}`);
  },

  // Lấy sản phẩm nổi bật (cho trang chủ/sidebar)
  getFeatured: () => {
    return axiosClient.get('/products?featured=true');
  },

  // Lấy sản phẩm theo ID danh mục (cho trang CategoryPage)
  getByCategoryId: (categoryId) => {
    return axiosClient.get(`/products?category_id=${categoryId}`);
  },

  // --- Dành cho Admin ---
  create: (data) => {
    return axiosClient.post('/products', data);
  },

  update: (id, data) => {
    return axiosClient.put(`/products/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/products/${id}`);
  }
};

export default productService;