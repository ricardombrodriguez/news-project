"""djangoProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views as auth_views

from app import views

urlpatterns = [
    path('ws/login_token', auth_views.ObtainAuthToken.as_view()),
    path('admin/', admin.site.urls),

    # GROUP ENDPOINTS
    path('ws/groups', views.get_groups),
    path('ws/group/<str:description>', views.get_group_by_description),

    # USER ENDPOINTS
    path('ws/user', views.create_user),
    path('ws/user/<int:id>/', views.update_user),
    path('ws/users', views.get_users),
    path('ws/users/search/group/<str:group>', views.get_users_by_group),
    path('ws/users/search', views.get_search_users),
    path('ws/user/<int:id>/', views.get_user),
    path('ws/user/<str:username>', views.get_user_by_username),
    path('ws/user/search/likes', views.search_user_liked_publications),
    path('ws/user/likes', views.get_user_liked_publications),
    
    # PUBLICATION STATUS ENDPOINTS
    path('ws/pubstatus/<str:description>', views.get_pub_status),
    path('ws/pubstatus', views.get_all_pub_status),

    # PUBLICATION TOPICS ENDPOINTS
    path('ws/pubtopic/<int:id>/', views.get_pub_topic),
    path('ws/pubtopic/<str:description>', views.get_pub_topic_by_description),
    path('ws/pubtopics', views.get_pub_topics),
    path('ws/pubtopics/enabled', views.get_pub_topics_enabled),
    path('ws/pubtopic', views.get_pub_topics_create),
    path('ws/pubtopic/<int:id>/', views.get_pub_topics_update),
    path('ws/pubtopic/<int:id>/disable', views.pub_topic_disable),
    path('ws/pubtopic/<int:id>/enable', views.pub_topic_enable),

    # PUBLICATION ENDPOINTS
    path('ws/publications', views.get_publications),
    path('ws/publication/<int:id>/', views.get_publication),
    path('ws/publication', views.create_publication),
    path('ws/publication/<int:id>/', views.update_publication),
    path('ws/publications/<str:status>', views.get_publication_by_status),


    # PUBLICATION ENDPOINTS (FILTERED)
    path('ws/author/publications', views.get_author_publications),
    path('ws/author/publications/<str:status>', views.get_author_publications_by_status),
    path('ws/author/publications/search/<str:status>', views.get_author_searched_publications_by_status),
    path('ws/publications/search/<str:status>', views.get_search_publications_by_status),

    # COMMENT ENDPOINTS
    path('ws/comment/<int:id>/', views.get_comment),
    path('ws/comments', views.get_all_comments),
    path('ws/publication/<int:id>/comments', views.get_publication_comments),
    path('ws/comment', views.create_publication_comment),
    path('ws/comment/<int:id>/', views.delete_publication_comment),

    # LIKE ENDPOINTS
    path('ws/like/<int:id>/', views.get_like),
    path('ws/likes', views.get_likes),
    path('ws/publication/<int:id>/like', views.create_like),
    path('ws/like/<int:id>/', views.delete_like),
    path('ws/publication/<int:pub_id>/like/verify', views.verify_pub_like_by_user),

]
