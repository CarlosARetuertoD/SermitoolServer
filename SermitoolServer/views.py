from django.shortcuts import render
from django.http import HttpResponse

def about_view(request):
    return render(request, 'about.html')

def contact_view(request):
    return render(request, 'contact.html')

def index_view(request):
    return render(request, 'index.html')

def item_view(request):
    return render(request, 'item.html')

def products_view(request):
    return render(request, 'products.html')

def quality_view(request):
    return render(request, 'quality.html')

def services_view(request):
    return render(request, 'services.html')
