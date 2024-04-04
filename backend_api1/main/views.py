from rest_framework import generics, permissions
from . import serializers
from . import models
from rest_framework.response import Response
from rest_framework import status

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
    serializer_class = serializers.ProductRetrieveSerializer
    #permission_classes = [permissions.IsAuthenticated]

class productimages(generics.ListCreateAPIView):
    queryset= models.productimages.objects.all()
    serializer_class = serializers.ProductImageSerializer
    permission_classes = [permissions.IsAuthenticated]


class productdetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= models.products.objects.all()
    serializer_class = serializers.ProductRetrieveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)

        # Customize serialized data here, e.g., include images
        data = serializer.data
        for item in data:
            product_id = item['id']
            images = models.productimages.objects.filter(product__id=product_id)
            image_serializer = serializers.ProductImageSerializer(images, many=True)
            item['images'] = image_serializer.data

        return Response(data)

class productcreate(generics.CreateAPIView):
    serializer_class = serializers.notificationserializer
    '''
    @transaction.atomic
    def post(self, request, format=None):
        images = request.data.get('images', [])
        request.data.pop('images')
        serialized_data = self.serializer(data=request.data)
        product_obj = None
        if serialized_data.is_valid():
            product_obj=Product.objects.create(**serialized_data.validated_data)
        if product_obj and len(images) > 0:
            for image_data in images:
                image_data['product_id'] = str(product_obj._id)
                product_image_serialized_data = ProductImageSerializer(data=image_data)
        if product_image_serialized_data.is_valid(raise_exception=True):
            product_image_obj = ProductImage.objects.create(**product_image_serialized_data.validated_data)

    # Write your necessary code if needed
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        '''

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