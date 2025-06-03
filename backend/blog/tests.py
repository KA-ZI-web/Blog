# backend/blog/tests.py
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class PostAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test')
        self.client.login(username='test', password='test')

    def test_create_post(self):
        response = self.client.post('/api/posts/', {
            'title': 'Test',
            'content': 'Content'
        })
        self.assertEqual(response.status_code, 201)