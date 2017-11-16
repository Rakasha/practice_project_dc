from django.db import models
from django.contrib.auth import get_user_model


class Image(models.Model):
    file = models.FileField(upload_to="images/")
    upload_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(get_user_model())