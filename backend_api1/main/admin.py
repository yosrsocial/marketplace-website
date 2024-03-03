from django.contrib import admin
from . import models

admin.site.register(models.userprofile)
admin.site.register(models.productcategory)
admin.site.register(models.products)