from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from api.models import Task
from api.views import task_list, task_single

class TaskTests(APITestCase):
    """Class to test task api"""
    def setUp(self):
        """create seed task"""
        Task.objects.create(task_name="test_name1", task_id=1)

    def test_create_task(self):
        """test the creation of a task by POST to /api/tasks/"""
        response = self.client.post('/api/tasks/', {'task_name': 'test_name2'}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(), 2)
        self.assertEqual(Task.objects.get(pk=2).task_name, 'test_name2')

    def test_get_task(self):
        """test the retrieval of a single task by GET to /api/tasks/task_id/"""
        response = self.client.get('/api/tasks/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Task.objects.get(pk=1).task_name, 'test_name1')

    def test_list_tasks(self):
        """test the listing of all tasks by GET to /api/tasks/"""
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, 200)

    def test_delete_task(self):
        """test the deleting of a single task by DEL to /api/tasks/task_id/"""
        response = self.client.delete('/api/tasks/1/')
        self.assertEqual(response.status_code, 204)

    def test_get_invalid_task(self):
        """test getting a non existant out of range task"""
        response = self.client.get('/api/tasks/10/')
        self.assertEqual(response.status_code, 404)

