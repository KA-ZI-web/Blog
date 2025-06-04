import React from 'react'; 
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//组件定义，navigate（登陆成功后跳转到首页）
const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const res = await axios.post('http://localhost:8000/api/token/', values);
      //登陆成功过后存储访问令牌
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      message.success('登录成功！');
      navigate('/');
    } catch (error) {
      message.error('用户名或密码错误');
    }
  };


  //表单UI界面（Ant Design 的 Form 组件）
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Button type="primary" htmlType="submit">登录</Button>
    </Form>
  );
};

export default LoginForm;