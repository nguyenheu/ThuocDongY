import axiosClient from './axiosClient';

const categoryService = {
  getAll: () => {
    return axiosClient.get('/categories');
  },

  getBySlug: (slug) => {
    return axiosClient.get(`/categories/slug/${slug}`);
  },

  // Admin
  create: (data) => {
    return axiosClient.post('/categories', data);
  },

  update: (id, data) => {
    return axiosClient.put(`/categories/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/categories/${id}`);
  }
};

export default categoryService;