// frontend/src/components/PostList.tsx
import React, { useState, useEffect } from 'react';
import { Button, message, Table } from 'antd';
import PostForm from './PostForm';
import api from '../untils/axiosConfig';
import { Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';


interface Post {
  id?: number;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);//初始态为加载中
  const [error, setError] = useState<string | null>(null);

//---------------------------------------------------
//数据逻辑获取
//---------------------------------------------------

// 获取文章列表
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/posts/');
      setPosts(response.data);
    } catch (error) {
      message.error('获取文章列表失败');
      console.error('获取文章列表错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时初始化数据
  useEffect(() => {
    fetchPosts();
  }, []);

  // 处理新建/编辑成功
  const handleSuccess = () => {
    message.success('操作成功');
    fetchPosts(); // 刷新列表
    setEditingPost(null); // 关闭表单
  };

  // 编辑文章
  const handleEdit = (record: Post) => {
    setEditingPost({ ...record });
  };
  // 删除文章
  const handleDelete = async (id: number) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      try {
        await api.delete(`/posts/${id}/`);
        message.success('删除成功');
        fetchPosts(); // 刷新列表
      } catch (error) {
        message.error('删除失败');
        console.error('删除文章错误:', error);
      }
    }
  };

  // 表格列配置
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
       render: (text, record) => (
        <Link to={`/posts/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      // 根据实际情况显示作者信息
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true, // 超出长度显示省略号
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Post) => (
        <div>
          <Link to={`/posts/${record.id}`}>查看详情</Link>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id!)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

//----------------------------------------------------------------

//-----------------------------------------------------------------
//列表内容
//-----------------------------------------------------------------

  return (
    <div>
      <Button onClick={() => setEditingPost({title:'',content:'',author: ''})}>
        新建文章
      </Button>

      {/* 编辑表单 */}
      {editingPost && (
        <div style={{ marginTop: '20px', padding: '16px', border: '1px solidrgb(155, 208, 240)', borderRadius: '4px' }}>
          <PostForm post={editingPost} onSuccess={handleSuccess} />
          <Button 
            style={{ marginTop: '10px' }} 
            onClick={() => setEditingPost(null)}
          >
            取消
          </Button>
        </div>
      )}

      {/* 文章列表 */}
      <Table
        columns={columns}
        dataSource={posts}
        loading={loading}
        rowKey="id"
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default PostList;