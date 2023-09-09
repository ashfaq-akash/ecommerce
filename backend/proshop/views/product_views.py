from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response


from proshop.models import Product
from proshop.serializers import ProductSerializer

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializers=ProductSerializer(products,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response('Product is deleted')
