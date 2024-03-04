from rest_framework import generics, permissions
from . import serializers
from . import models

class userlist(generics.ListCreateAPIView):
    queryset= models.userprofile.objects.all()
    serializer_class = serializers.userserializer
    permission_classes = [permissions.IsAuthenticated]

class userdetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= models.userprofile.objects.all()
    serializer_class = serializers.userdetailserializer
    permission_classes = [permissions.IsAuthenticated]

class productlist(generics.ListCreateAPIView):
    queryset= models.products.objects.all()
    serializer_class = serializers.productserializer
    permission_classes = [permissions.IsAuthenticated]

class productdetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= models.products.objects.all()
    serializer_class = serializers.productdetailserializer
    permission_classes = [permissions.IsAuthenticated]

class productcategories(generics.ListCreateAPIView):
    queryset= models.productcategory.objects.all()
    serializer_class = serializers.productcategoryserializer
    permission_classes = [permissions.IsAuthenticated]

class orderlist(generics.ListCreateAPIView):
    queryset= models.orders.objects.all()
    serializer_class = serializers.orderserializer
    permission_classes = [permissions.IsAuthenticated]

class orderitems(generics.RetrieveUpdateDestroyAPIView):
    queryset= models.orderItem.objects.all()
    serializer_class = serializers.orderitemserializer
    permission_classes = [permissions.IsAuthenticated]

class transactionlist(generics.ListCreateAPIView):
    queryset= models.transactions.objects.all()
    serializer_class = serializers.transactionserializer
    permission_classes = [permissions.IsAuthenticated]

class notificationlist(generics.ListCreateAPIView):
    queryset= models.notifications.objects.all()
    serializer_class = serializers.notificationserializer
    permission_classes = [permissions.IsAuthenticated]

class ratingslist(generics.ListCreateAPIView):
    queryset= models.ratings.objects.all()
    serializer_class = serializers.ratingserializer
    permission_classes = [permissions.IsAuthenticated]