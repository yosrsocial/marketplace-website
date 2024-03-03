from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.userlist.as_view(), name='user-list'),
    path('user/<int:pk>/', views.userdetails.as_view(), name='user-details'),
    path('products/', views.productlist.as_view(), name='products'),
    path('product/<int:pk>/', views.productdetails.as_view(), name='product-details'),

]