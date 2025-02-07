from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # The path to create a new user
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    
    # The path to get a new access token
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    
    # The path to get a new refresh token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    
    # This includes all the urls for the rest_framework
    path('api-auth/', include('rest_framework.urls')),
    
    # This includes all the urls for the api app
    path("api/", include("api.urls")),
]
