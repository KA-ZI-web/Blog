

# Create your views here.
from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from django.shortcuts import render
import os

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # 在创建时自动设置author为当前用户
        serializer.save(author=self.request.user)
    
