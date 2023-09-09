from django.urls import path
from proshop.views import product_views as views


urlpatterns=[
    path('',views.getProducts,name="products"),
    path('<str:pk>',views.getProduct,name="product"),
    path('delete/<str:pk>/',views.deleteProduct,name="product-delete"),
]