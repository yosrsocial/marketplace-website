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
            'id','username', 'bio', 'profile_picture', 'city', 'zip_code', 'account_verified', 
            'preferred_payment_methods', 'preferred_delivery_methods', 
            'social_media_links'
                 ]
        
class productserializer(serializers.ModelSerializer):
    class Meta:
        productrating = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        model= models.products
        fields= [
            'id','title','price', 'image', 'seller', 'productrating'
                 ]

class productdetailserializer(serializers.ModelSerializer):
    class Meta:
        productrating = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        model= models.products
        fields= [
            'id','title', 'description', 'price', 'category', 'seller', 'quantity', 'size', 'color', 'is_sold', 'created_at'
                 ]
        
class productcategoryserializer(serializers.ModelSerializer):
    class Meta:
        model= models.productcategory
        fields= [
            'title',
                 ]
        

class orderserializer(serializers.ModelSerializer):
    class Meta:
        model= models.orders
        fields= [
            'id','user', 'products', 'created_at', 'total_amount',
                 ]
        
class orderitemserializer(serializers.ModelSerializer):
    class Meta:
        model= models.orderItem
        fields= [
            'id', 'order', 'product', 'quantity', 'item_price',
        ]

class savedserializer(serializers.ModelSerializer):
    class Meta:
        model= models.saved
        fields= [
            'user', 'product', 'saved_at',
        ]

class transactionserializer(serializers.ModelSerializer):
    class Meta:
        model= models.transactions
        fields= [
            'transaction_id', 'payment_method', 'order', 'timestamp', 'success'
        ]

class notificationserializer(serializers.ModelSerializer):
    class Meta:
        model= models.notifications
        fields= [
            'user', 'message', 'timestamp', 'is_read'
        ]

class ratingserializer(serializers.ModelSerializer):
    class Meta:
        model= models.ratings
        fields= [
            'user', 'product', 'rating_value',
        ]
