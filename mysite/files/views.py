from django.shortcuts import render
from django.views import View


class FileActions(View):

    def get(self, request, *args, **kwargs):
        raise NotImplementedError

    def post(self, request, *args, **kwargs):
        raise NotImplementedError
