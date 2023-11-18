from rest_framework.routers import DefaultRouter
from django.urls import path, include

from recipe.views import RecipeViewSet

router = DefaultRouter()
router.register('', RecipeViewSet, basename='recipe')

urlpatterns = [
    path('', include(router.urls)),
]