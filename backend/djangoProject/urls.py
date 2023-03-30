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
    path('ws/groups', views.get_group),
    path('ws/create_user', views.create_user),
    path('ws/userupd', views.update_user),
    path('ws/users', views.get_users),
    path('ws/user', views.get_user),
    path('ws/get_user', views.get_user_by_username),
    path('ws/pubstatusgetOne', views.pub_status_getOne),
    path('ws/pubstatusgetALl', views.pub_status_getALl),
    path('ws/pubtopicsgetOne', views.get_pub_topic),
    path('ws/pubtopicsgetByDescription', views.get_pub_topic_by_description),
    path('ws/pubtopicsgetAll', views.get_pub_topics),
    path('ws/pubtopicsenabledgetAll', views.get_pub_topics_enabled),
    path('ws/pubtopicscreate', views.get_pub_topics_create),
    path('ws/pubtopicsupdate', views.get_pub_topics_update),
    path('ws/pubtopicsdisable', views.pub_topic_disable),
    path('ws/pubtopicsenable', views.pub_topic_enable),
    path('ws/pubs', views.pubs),
    path('ws/pub', views.pub),
    path('ws/pubcrate', views.pubcreate),
    path('ws/pubupd', views.pubupd),
    path('ws/comment', views.comment),
    path('ws/comments', views.comments),
    path('ws/commentsPublication', views.commentsPublication),
    path('ws/commentcre', views.commentcre),
    path('ws/commentdel/<int:id>', views.commentdel),
    path('ws/fav', views.fav),
    path('ws/favs', views.favs),
    path('ws/favcre', views.favcre),
    path('ws/favdel/<int:id>', views.favdel),
    path('ws/getAuthorPublications', views.getAuthorPublications),
    path('ws/getAuthorPublicationsFiled', views.getAuthorPublicationsArquivadas),
    path('ws/getPublicationsFiled', views.getPublicationsArquivadas),
    path('ws/getAuthorPublicationsPendent', views.getAuthorPublicationsPendent),
    path('ws/getPublicationsPendent', views.getPublicationsPendent),
    path('ws/getAuthorPublicationsApproved', views.getAuthorPublicationsApproved),
    path('ws/getAuthorFavoritePublications', views.getAuthorFavoritePublications),
    path('ws/getPublicationsApproved', views.getPublicationsApproved),
    path('ws/getSearchPublicationsApproved', views.getSearchPublicationsApproved),
    path('ws/getSearchPublicationsPendent', views.getSearchPublicationsPendent),
    path('ws/getSearchPublicationsFilled', views.getSearchPublicationsFilled),
    path('ws/getSearchPublicationsApprovedByUser', views.getSearchPublicationsApprovedByUser),
    path('ws/getSearchPublicationsPendentByUser', views.getSearchPublicationsPendentByUser),
    path('ws/getSearchPublicationsFilledByUser', views.getSearchPublicationsFilledByUser),
    path('ws/getSearchPublicationsFavorites', views.getSearchPublicationsFavorites),
    path('ws/checkIfFavorite', views.checkIfFavorite),
    path('ws/getSearchUsers', views.getSearchUsers),
    path('ws/getSearchUsersPossible', views.getSearchUsersPossible),
    path('ws/get_groupDescription', views.get_groupDescription),
]
