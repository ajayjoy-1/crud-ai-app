
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import PersonViewSet,ai_chat_handler
from django.conf import settings
from django.conf.urls.static import static

# The router automatically creates standard RESTful URL routes
router = DefaultRouter()
router.register(r'persons', PersonViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/chat/', ai_chat_handler)
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)