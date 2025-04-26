from django.urls import path
from . import views

urlpatterns = [
    path('about/', views.about_view, name='about' ),
    path('contact/', views.contact_view, name='contact' ),
    path('', views.index_view, name='index'),
    path('item/', views.item_view, name='item' ),
    path('products/', views.products_view, name='products' ),
    path('quality/', views.quality_view, name='quality' ),
    path('services/', views.services_view, name='services' ),
]