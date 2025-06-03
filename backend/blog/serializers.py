# blog/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from . models import Post

# 序列化器定义API的表示形式
# 用户序列化器类：
class UserSerializer(serializers.ModelSerializer):
    #Model 元数据就是 "不是一个字段的任何数据" 
    class Meta:
        model = User

        #序列化多个字段
        fields = ['id', 'username']

#文章序列化器类型：
class PostSerializer(serializers.ModelSerializer):
     # 只读作者信息 外键字段相关的数据，需要单独序列化
    author = UserSerializer(read_only=True) 

    class Meta:
        model = Post

        #序列化所有字段
        fields = '__all__'