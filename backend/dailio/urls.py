"""
dailio URL Configuration
"""
from django.conf.urls import url, include
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^account/', include('rest_auth.urls')),
    url(r'^', include('api.urls')),
    url(r'^', include('accounts.urls')),
    url(r'^$', TemplateView.as_view(template_name='vueapp.html'), name='home'),
]
