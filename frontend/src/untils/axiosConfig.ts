// 正确导入方式：
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器：添加令牌到请求头
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理401错误（令牌过期）
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 如果响应状态码为401且未重试过
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 使用refresh_token获取新的access_token
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const refreshResponse = await axios.post(
          'http://localhost:8000/api/token/refresh/',
          { refresh: refreshToken }
        );
        
        // 存储新的access_token
        localStorage.setItem('access_token', refreshResponse.data.access);
        
        // 重试原请求
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // 刷新失败，跳转到登录页
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;