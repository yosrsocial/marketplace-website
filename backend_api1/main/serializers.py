from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from rest_framework import serializers
class userserializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ['id', 'username', 'email', 'password']
        

class ProductImageDetailSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.products
        fields = '__all__' 

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)
    
class ProductImageCreateSerializer(serializers.ModelSerializer):
    image = serializers.ListSerializer(child=serializers.FileField(required=False))
    class Meta:
        model = models.products
        fields = ['image']
        
class ProductRetrieveSerializer(serializers.ModelSerializer):
    #product_images = serializers.SerializerMethodField('get_product_images')
    product_images = ProductImageDetailSerializer(many=True)
    category = serializers.SerializerMethodField('get_product_category')
    seller = serializers.SerializerMethodField('get_product_seller')
    class Meta:
        model = models.products
        fields = ['id', 'category', 'title', 'seller', 'price', 'description', 'quantity', 'size', 'color', 'is_sold', 'created_at', 'product_images']

    '''def get_product_images(self, obj):
        images = models.productimages.objects.filter(product=obj)
        return [self.context['request'].build_absolute_uri(image.image.url) for image in images]
'''
    def get_product_category(self, obj):
        return obj.category.title if obj.category else None
    
    def get_product_seller(self, obj):
        return obj.seller.username if obj.seller else None

class sellerserializer(serializers.ModelSerializer):
    model = models.Seller
    fields = '__all__'

class productcreationserializer(serializers.ModelSerializer):
    product_images = ProductImageCreateSerializer(many=True)
    class Meta:
            model = models.products
            fields = '__all__'



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
