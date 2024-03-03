from rest_framework import serializers
from . import models

class userserializer(serializers.ModelSerializer):
    class Meta:
        model= models.userprofile
        fields= [
            'id','username'
                 ]
        
class userdetailserializer(serializers.ModelSerializer):
    class Meta:
        model= models.userprofile
        fields= [
            'id','username', 'bio', 'profile_picture', 'city', 'zip_code',
            'seller_rating', 'buyer_rating', 'account_verified', 
            'preferred_payment_methods', 'preferred_delivery_methods', 
            'social_media_links'
                 ]
        
class productserializer(serializers.ModelSerializer):
    class Meta:
        model= models.products
        fields= [
            'id','title', 'seller'
                 ]

class productdetailserializer(serializers.ModelSerializer):
    class Meta:
        model= models.products
        fields= [
            'id','title', 'description', 'price', 'category', 'seller', 'quantity', 'size', 'color', 'is_sold', 'created_at'
                 ]