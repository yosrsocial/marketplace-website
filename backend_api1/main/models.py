from django.db import models
from django.contrib.auth.models import User

# User models    
class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_account_id = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    balance = models.DecimalField(max_digits= 3, decimal_places=2 , blank=True, null=True)

    def __str__(self):
        return self.user.username

class productcategory(models.Model):
    title= models.CharField(max_length=200)
    
    def __str__(self):
        return self.title
    
class products(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(productcategory, on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=20, blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True)
    is_sold = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

    def average_rating(self):
        # Calculate the average rating for the product
        ratings = ratings.objects.filter(product=self)
        if ratings:
            return sum(rating.rating_value for rating in ratings) / len(ratings)
        return 0 


class saved(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(products, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product') 



class orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(products, through='OrderItem')
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)


class orderItem(models.Model):
    order = models.ForeignKey(orders, on_delete=models.CASCADE)
    product = models.ForeignKey(products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    item_price = models.DecimalField(max_digits=10, decimal_places=2)


class transactions(models.Model):
    order = models.OneToOneField(orders, on_delete=models.CASCADE)
    transaction_id = models.CharField(max_length=100)
    payment_method = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)

class notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)


class ratings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratingusers')
    product = models.ForeignKey(products, on_delete=models.CASCADE, related_name='productrating')
    rating_value = models.IntegerField(choices=[(1, '1 star'), (2, '2 stars'), (3, '3 stars'), (4, '4 stars'), (5, '5 stars')])

    class Meta:
        unique_together = ['user', 'product']

