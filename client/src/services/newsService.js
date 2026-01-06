import axiosClient from './axiosClient';

const newsService = {
  getAll: () => {
    return axiosClient.get('/news');
  },

  getLatest: (limit = 3) => {
    return axiosClient.get(`/news?limit=${limit}`);
  },

  getBySlug: (slug) => {
    return axiosClient.get(`/news/${slug}`); // Lưu ý check lại route bên server
  },

  // Admin
  create: (data) => {
    return axiosClient.post('/news', data);
  },

  update: (id, data) => {
    return axiosClient.put(`/news/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/news/${id}`);
  }
};

export default newsService;