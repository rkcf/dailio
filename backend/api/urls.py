"""
dailio api url routes
"""
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
        url(r'^api/tasks/$', views.TaskAll.as_view()),
        url(r'^api/tasks/(?P<pk>[0-9]+)/$', views.TaskSingle.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
