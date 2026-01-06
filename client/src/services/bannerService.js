import axiosClient from './axiosClient';
const bannerService = {
  getAll: () => axiosClient.get('/banners'),
  // Nếu có admin quản lý banner thì thêm create/update/delete
};
export default bannerService;