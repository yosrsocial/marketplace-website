from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import InMemoryUploadedFile
import logging
from django.conf import settings
import stripe
import json

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateConnectedAccountView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            account = stripe.Account.create(
                type='express',
            )
            # Store the account.id in database associated with the seller
            seller = request.user.Seller
            seller.stripe_account_id = account.id
            seller.save()

            return JsonResponse({'account_id': account.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

class CreatePaymentIntentView(APIView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        amount = data.get('amount')
        currency = data.get('currency', 'usd')
        payment_method = data.get('payment_method')
        seller_id = data.get('seller_id')  # Assuming the frontend sends the seller's ID

        try:
            # Fetch the seller's Stripe account ID
            seller = models.Seller.objects.get(id=seller_id)
            stripe_account_id = seller.stripe_account_id

            # Create the PaymentIntent
            payment_intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                payment_method=payment_method,
                confirmation_method='manual',
                confirm=True,
                transfer_data={
                    'destination': stripe_account_id,  # Seller's Stripe account ID
                },
                capture_method='manual',  # Optional: Capture the payment later
            )

            return JsonResponse({'client_secret': payment_intent['client_secret']})

        except models.Seller.DoesNotExist:
            return JsonResponse({'error': 'Seller not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


class CapturePaymentView(APIView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        payment_intent_id = data.get('payment_intent_id')

        try:
            # Capture the payment
            payment_intent = stripe.PaymentIntent.capture(
                payment_intent_id
            )

            return JsonResponse({'status': payment_intent['status']})

        except stripe.error.StripeError as e:
            return JsonResponse({'error': str(e)}, status=400)
        


product_view_logger = logging.getLogger(__name__)

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.userserializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.userserializer

@method_decorator(csrf_exempt, name='dispatch')
class UserLoginView(APIView):
    def post(self, request):
        try:
            # Use request.data to get POST data from a JSON body
            username = request.data.get('username')
            password = request.data.get('password')

            if not username or not password:
                return Response({"error": "Username and password are required"}, status=400)
            user = authenticate(username=username, password=password)

            if user:
                refresh = RefreshToken.for_user(user)
                return JsonResponse({
                    "status": "success", 
                    "message": "Logged in!",
                    'username': user.username,
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),})
            else:
                return JsonResponse({"status": "error", "message": "Invalid credentials"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)



class productlist(generics.ListCreateAPIView):
    queryset= models.products.objects.all()
    serializer_class = serializers.ProductRetrieveSerializer
    permission_classes = [permissions.IsAuthenticated]

class productimages(generics.ListCreateAPIView):
    queryset= models.productimages.objects.all()
    serializer_class = serializers.ProductImageDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

class CreateProductImageAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = serializers.ProductImageCreateSerializer(data=request.data)


class productdetails(generics.RetrieveUpdateDestroyAPIView):
    queryset= models.products.objects.all()
    serializer_class = serializers.ProductRetrieveSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)

        # Customize serialized data here, e.g., include images
        data = serializer.data
        for item in data:
            product_id = item['id']
            images = models.productimages.objects.filter(product__id=product_id)
            image_serializer = serializers.ProductImageDetailSerializer(images, many=True)
            item['images'] = image_serializer.data

        return Response(data)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.products.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return serializers.productcreationserializer
        return serializers.ProductRetrieveSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
    # Handle uploaded images
        product_images = request.FILES.getlist('product_images')
        #product_view_logger.debug("Uploaded Images: %s", request.FILES.getlist('product_images'))
        for image in product_images:
            product_images = models.productimages(product=product, image=image)
            product_images.save()

        return Response(serializer.data)

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

'''
class productcreate(generics.CreateAPIView):
    serializer_class = serializers.notificationserializer
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