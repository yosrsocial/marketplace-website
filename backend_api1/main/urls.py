from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/login/', views.UserLoginView.as_view(), name='user-login'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('orders/', views.orderlist.as_view(), name='orders'),
    path('orders/<int:pk>/', views.orderitems.as_view(), name='order-details'),
    path('categories/', views.productcategories.as_view(), name='categories'),
    path('transactions/', views.transactionlist.as_view(), name='transactions'),    
    path('notifications/', views.notificationlist.as_view(), name='notifications'),    
    path('ratings/', views.ratingslist.as_view(), name='ratings'),
    path('create-payment-intent/', views.CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('capture-payment-intent/', views.CapturePaymentView.as_view(), name='capture-payment-intent'),
    path('create-connected-account/', views.CreateConnectedAccountView.as_view(), name='create-connected-account'),
    path('create-account-link/', views.create_account_link, name='create_account_link'),
]