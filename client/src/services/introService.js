import axiosClient from './axiosClient';
const introService = {
  getAll: () => axiosClient.get('/intro'),
  getBySlug: (slug) => axiosClient.get(`/intro/${slug}`),
};
export default introService;