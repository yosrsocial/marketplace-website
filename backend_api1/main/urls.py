from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.userlist.as_view(), name='users'),
    path('users/<int:pk>/', views.userdetails.as_view(), name='user-details'),
    path('products/', views.productlist.as_view(), name='products'),
    path('productimages/', views.productimages.as_view(), name='productimages'),
    path('products/<int:pk>/', views.productdetails.as_view(), name='product-details'),
    path('orders/', views.orderlist.as_view(), name='orders'),
    path('orders/<int:pk>/', views.orderitems.as_view(), name='order-details'),
    path('categories/', views.productcategories.as_view(), name='categories'),
    path('transactions/', views.transactionlist.as_view(), name='transactions'),    
    path('notifications/', views.notificationlist.as_view(), name='notifications'),    
    path('ratings/', views.ratingslist.as_view(), name='ratings'),
]