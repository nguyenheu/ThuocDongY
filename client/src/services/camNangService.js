import axiosClient from './axiosClient';

const camNangService = {
  // Lấy danh sách cẩm nang
  getAll: () => {
    return axiosClient.get('/cam-nang');
  },

  // Lấy chi tiết 1 bài (dùng cho trang chi tiết sau này)
  getBySlug: (slug) => {
    return axiosClient.get(`/cam-nang/${slug}`);
  }
};

export default camNangService;