import axiosClient from './axiosClient';
const remedyService = {
  getAll: () => axiosClient.get('/bai-thuoc'),
  getBySlug: (slug) => axiosClient.get(`/bai-thuoc/${slug}`),
};
export default remedyService;