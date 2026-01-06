import axiosClient from './axiosClient';
const materialService = {
  getAll: () => axiosClient.get('/duoc-lieu'),
  getBySlug: (slug) => axiosClient.get(`/duoc-lieu/${slug}`),
};
export default materialService;