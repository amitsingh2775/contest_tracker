import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getContests = (params) => api.get('/contests', { params });
export const getBookmarks = () => api.get('/bookmarks', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const addBookmark = (contestId, action) => api.post('/bookmarks', { contestId, action }, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const addSolution = (data) => api.post('/solutions', data, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getProfile = () => api.get('/auth/profile', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getPastContests = () => api.get('/contests/past');