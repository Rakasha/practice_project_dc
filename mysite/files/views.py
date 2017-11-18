from django.shortcuts import render
from django.views import View
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os

from .forms import UploadFileForm



class FileUploadPage(View):

    def get(self, request, *args, **kwargs):
        return render(request, 'v_upload.html')


class FileActions(View):

    def get(self, request, *args, **kwargs):
        form = UploadFileForm()
        return render(request, 'upload.html', {'form': form})

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            # form.save()
            handle_uploaded_file(request.FILES['file'])
            return JsonResponse({'message': 'Success !'})
        else:
            return JsonResponse(form.errors)


def handle_uploaded_file(f):

    filepath = os.path.join(settings.MEDIA_ROOT, 'user_upload_image.jpg')
    with open(filepath, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)