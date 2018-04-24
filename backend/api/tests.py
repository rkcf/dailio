"""
dailio api testing
"""

from rest_framework.test import APITestCase, APIClient
from api.models import Task, CompletionDate
from django.contrib.auth.models import User


class TaskTests(APITestCase):
    """Class to test task api"""
    def setUp(self):
        """create seed tasks and test user"""
        # Create test user
        User.objects.create(username='testuser', password='testpassword')

        Task.objects.create(task_name="test_name1", task_streak=5,
                            task_maxstreak=5)

        # Create a task with a completion date to test uncompleting
        task_obj = Task.objects.create(task_name="test_name2",
                                       task_streak=5, task_maxstreak=5)
        date_obj = CompletionDate.objects.create()
        task_obj.completion_dates.add(date_obj)

        # Create test client and force authenticate
        self.client = APIClient()
        user = User.objects.get(username='testuser')
        self.client.force_authenticate(user=user)

    def test_create_task(self):
        """test the creation of a task by POST to /api/tasks/"""
        response = self.client.post('/api/tasks/', {'task_name': 'test_name2'},
                                    format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.get(pk=3).task_name, 'test_name2')

    def test_get_task(self):
        """test the retrieval of a single task by GET @ /api/tasks/task_id/"""
        response = self.client.get('/api/tasks/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Task.objects.get(pk=1).task_name, 'test_name1')

    def test_list_tasks(self):
        """test the listing of all tasks by GET @ /api/tasks/"""
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, 200)

    def test_delete_task(self):
        """test the deleting of a single task by DEL @ /api/tasks/task_id/"""
        response = self.client.delete('/api/tasks/1/')
        self.assertEqual(response.status_code, 204)

    def test_get_invalid_task(self):
        """test getting a non existant out of range task"""
        response = self.client.get('/api/tasks/100/')
        self.assertEqual(response.status_code, 404)

    def test_complete_task(self):
        """test completing a task"""
        self.client.put('/api/tasks/1/done/')
        self.assertEqual(Task.objects.get(pk=1).task_streak, 6)
        self.assertEqual(Task.objects.get(pk=1).task_maxstreak, 6)
        self.assertEqual(Task.objects.get(pk=1).task_completed, True)
        self.assertTrue(CompletionDate.objects.all()[0] in
                        Task.objects.get(pk=1).completion_dates.all())

    def test_uncomplete_task(self):
        """test uncompleting a task"""
        self.client.delete('/api/tasks/2/done/')
        self.assertEqual(Task.objects.get(pk=2).task_streak, 4)
        self.assertEqual(Task.objects.get(pk=1).task_completed, False)
        self.assertTrue(CompletionDate.objects.all()[0] not in
                        Task.objects.get(pk=2).completion_dates.all())
