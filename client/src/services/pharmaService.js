import axiosClient from './axiosClient';
const pharmaService = {
  getAll: () => axiosClient.get('/dong-y-phat-phap'),
  getBySlug: (slug) => axiosClient.get(`/dong-y-phat-phap/${slug}`),
  // Admin
  create: (data) => axiosClient.post('/dong-y-phat-phap', data),
  update: (id, data) => axiosClient.put(`/dong-y-phat-phap/${id}`, data),
  delete: (id) => axiosClient.delete(`/dong-y-phat-phap/${id}`),
};
export default pharmaService;