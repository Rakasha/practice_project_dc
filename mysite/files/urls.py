from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^upload$', views.FileActions.as_view(), name='file_actions'),
    url(r'^editor$', views.ImgEditor.as_view(), name='file_actions'),
]