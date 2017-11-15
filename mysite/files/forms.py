from django import forms
from .models import Image


# class UploadFileForm(forms.ModelForm):
#     class Meta:
#         model = Image
#         fields = ['file']

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()
