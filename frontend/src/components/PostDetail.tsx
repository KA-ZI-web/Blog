// frontend/src/components/PostDetail.tsx
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import api from '../untils/axiosConfig';


interface Post {
  id: number; 
  title: string;
  content: string;
  created_at:string;
}

const PostDetail = () => {
  const { id } = useParams<{id :string}>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}/`);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  return post ? (
    <Card title={post.title}>
      <p>{post.content}</p>
      <small>发布时间: {new Date(post.created_at).toLocaleString()}</small>
    </Card>
  ) : (
        <div>文章不存在</div>
      );
};
export default PostDetail;