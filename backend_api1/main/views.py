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
