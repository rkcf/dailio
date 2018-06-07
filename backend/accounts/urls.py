from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from accounts import views

urlpatterns = [
        url(r'^account/settings/$', views.UserSettings.as_view()),
        url(r'^account/settings/vacation/$', views.UserSettingsVacation.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
