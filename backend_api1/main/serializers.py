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
        
class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.productimages
        fields = ('image', 'image_url')

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)
        
'''       
class productretrieveserializer(serializers.ModelSerializer):
    class Meta:
        productrating = serializers.SerializerMethodField(read_only=True)
        product_images = ProductImageSerializer(many=True, read_only=True)
        model= models.products
        fields= ['id', 'category', 'title', 'seller', 'price', 'description', 'quantity', 'size', 'color', 'is_sold', 'created_at', 'product_images']
'''

class ProductRetrieveSerializer(serializers.ModelSerializer):
    product_images = serializers.SerializerMethodField('get_product_images')
    category = serializers.SerializerMethodField('get_product_category')
    seller = serializers.SerializerMethodField('get_product_seller')
    class Meta:
        model = models.products
        fields = ['id', 'category', 'title', 'seller', 'price', 'description', 'quantity', 'size', 'color', 'is_sold', 'created_at', 'product_images']

    def get_product_images(self, obj):
        images = models.productimages.objects.filter(product=obj)
        return [self.context['request'].build_absolute_uri(image.image.url) for image in images]
    
    def get_product_category(self, obj):
        return obj.category.title if obj.category else None
    
    def get_product_seller(self, obj):
        return obj.seller.username if obj.seller else None
    
class productcreationserializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)

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
