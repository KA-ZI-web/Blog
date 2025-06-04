// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import React,{JSX} from "react";
import { Layout } from 'antd';


//功能：实现路由保护，确保只有登录用户才能访问某些页面
//工作原理：
//检查 localStorage 中是否存在access_token
//如果存在（已登录），渲染子组件（即受保护的页面）
//如果不存在（未登录），重定向到登录页面
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const { Content } = Layout;


function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            //登录页面
          <Route path="/login" element={<LoginForm />} />
            //文章页面
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/"
            //登录用户访问文章列表
            element={
              <PrivateRoute>
                 <PostList />
              </PrivateRoute>
            }
          />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
export default App;