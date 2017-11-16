from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.FileActions.as_view(), name='file_actions'),
]