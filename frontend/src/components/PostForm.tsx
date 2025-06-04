import React from 'react'; 
// 创建新文章：当不传递 post 属性时，表单执行创建操作
//编辑现有文章：当传递 post 对象时，表单自动填充数据并执行更新操作
import { Button, Form, Input } from 'antd';
import api from '../untils/axiosConfig';


interface Post {
  id?: number;  // 编辑时存在，新建时不存在
  title: string;
  content: string;
  author: string;
}

const PostForm = ({ post, onSuccess }: { post?: Post; onSuccess: () => void }) => {
  const onFinish = async (values: { title: string; content: string }) => {
    try {
      if (post?.id) {
        await api.put(`/posts/${post.id}/`, values);  // 编辑
      } else {
        await api.post('/posts/', values);  // 新建
      }
      onSuccess();
    } catch (error) {
      console.error('提交失败', error);
    }
  };

  //表单渲染
  return (
    <Form initialValues={post} onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true }]}>
        <Input placeholder="标题" />
      </Form.Item>
      <Form.Item name="content" rules={[{ required: true }]}>
        <Input.TextArea placeholder="内容" rows={6} />
      </Form.Item>
      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
  );
};
export default PostForm;