from django.db.models.functions import Concat
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db.models import Value as V
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from app.models import Groups, Users, Publication_status, Publication_topics, Publications, Comments, Favorites
from app.serializers import GroupsSerializer, UsersSerializer, PublicationStatusSerializer, \
    PublicationTopicsSerializer, PublicationsSerializer, CommentsSerializer, FavoritesSerializer, UserSerializer, TokenSerializer


# Create authentication token
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# ============== GROUPS ================== #

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_groups(request):

    groups = Groups.objects.all()
    serializer = GroupsSerializer(groups, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_group_by_description(request):

    groups = Groups.objects.all()
    group = (request.GET['description'])
    ret = []
    for pub in groups:
        if pub.description == group or (pub.description == "Admin" and group == "Moderator"):
            continue
        else:
            ret.append(pub)
    serializer = GroupsSerializer(ret, many=True)
    return Response(serializer.data)


# ============== USER ================== #

@api_view(['POST'])
def create_user(request):

    print(request.data)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        ret = serializer.create(request.data)
        token = TokenSerializer(data={'key': ret.key})
        return Response(token.initial_data)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request, id):
    try:
        user = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data["group"] = request.data["group"]["id"]
    serializer = UsersSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_users(request):

    users = Users.objects.all()
    serializer = UsersSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_user(request, id):

    try:
        user = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UsersSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_by_username(request, username):

    try:
        user = Users.objects.get(username=username)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UsersSerializer(user)
    return Response(serializer.data)



# ============== PUBLICATION STATUS ================== #


@api_view(['GET'])
def get_all_pub_status(request):

    ret = Publication_status.objects.all()
    serializer = PublicationStatusSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_pub_status(request, description):

    try:
        ret = Publication_status.objects.get(description__exact=description)
    except Publication_status.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationStatusSerializer(ret)
    return Response(serializer.data)




# ============== PUBLICATION TOPICS ================== #

@api_view(['GET'])
def get_pub_topic(request, id):

    try:
        ret = Publication_topics.objects.get(id=id)
    except Publication_topics.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationTopicsSerializer(ret)
    return Response(serializer.data)

@api_view(['GET'])
def get_pub_topic_by_description(request, description):

    try:
        ret = Publication_topics.objects.get(description=description)
    except Publication_topics.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationTopicsSerializer(ret)
    return Response(serializer.data)


@api_view(['GET'])
def get_pub_topics(request):

    ret = Publication_topics.objects.all()
    serializer = PublicationTopicsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_pub_topics_enabled(request):

    ret = Publication_topics.objects.all()
    enabled_topics = []
    for topic in ret:
        if topic.enabled:
            enabled_topics.append(topic)
    serializer = PublicationTopicsSerializer(enabled_topics, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_pub_topics_create(request):

    serializer = PublicationTopicsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_pub_topics_update(request, id):

    try:
        ret = Publication_topics.objects.get(id=id)
    except Publication_topics.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationTopicsSerializer(ret, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def pub_topic_disable(request, id):

    try:
        ret = Publication_topics.objects.get(id=id)
    except Publication_topics.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data['enabled'] = False
    serializer = PublicationTopicsSerializer(ret, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def pub_topic_enable(request, id):

    try:
        ret = Publication_topics.objects.get(id=id)
    except Publication_topics.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data['enabled'] = True
    serializer = PublicationTopicsSerializer(ret, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(status=status.HTTP_204_NO_CONTENT)





# ============== PUBLICATIONS ================== #


@api_view(['GET'])
def get_publication(request, id):

    try:
        ret = Publications.objects.get(id=id)
    except Publications.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationsSerializer(ret)
    return Response(serializer.data)


@api_view(['GET'])
def get_publications(request):

    ret = Publications.objects.all()
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_publication(request):

    description = request.data['status']['description']
    stat = Publication_status.objects.get(description__exact=description)
    request.data['topic'] = request.data['topic']['id']
    request.data['author'] = request.data['author']['id']
    request.data['status'] = stat.id
    print(request.data)
    serializer = PublicationsSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_publication(request, id):

    author=request.data["author"]
    topic=request.data["topic"]
    status=request.data["status"]
    try:
        ret = Publications.objects.get(id=id)
    except Publications.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data["author"]=(author["id"])
    request.data["topic"]=(topic["id"])
    request.data["status"] = (status["id"])
    serializer = PublicationsSerializer(ret, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ============== COMMENTS ================== #


@api_view(['GET'])
def get_comment(request, id):

    try:
        ret = Comments.objects.get(id=id)
    except Comments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentsSerializer(ret)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_comments(request):

    ret = Comments.objects.all()
    serializer = CommentsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_publication_comments(request, id):

    ret = Comments.objects.all()
    returned = []
    for x in ret:
        if x.publication.id == id:
            returned.append(x)
    serializer = CommentsSerializer(returned, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_publication_comment(request):

    request.data["author"] = request.data["author"]["id"]
    request.data["publication"] = request.data["publication"]["id"]
    serializer = CommentsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_publication_comment(request, id):

    try:
        ret = Comments.objects.get(id=id)
    except Comments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    ret.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)





# ============== LIKES ================== #



@api_view(['GET'])
def get_like(request, id):

    try:
        ret = Favorites.objects.get(id=id)
    except Favorites.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FavoritesSerializer(ret)
    return Response(serializer.data)


@api_view(['GET'])
def get_search_users(request):

    group = (request.GET['group'])
    topic = (request.GET['topic'])
    name = (request.GET['name'])
    username = (request.GET['username'])
    users = Users.objects.all()
    if topic != 'null':
        users = users.filter(group__description__exact=topic)
    if username!= 'null' :
        users = users.filter(username__contains=username)
    if name != 'null':
        users = users.annotate(full_name=Concat('first_name', V(' '), 'last_name')). \
            filter(full_name__contains=name)
    ret=[]
    for user in users:
        if user.group.description==group or (user.group.description=="Admin" and group=="Moderator"):
            continue
        else:
            ret.append(user)
    serializer = UsersSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_users_by_group(request, group):

    users = Users.objects.all()
    ret = []
    for user in users:
        if user.group.description == group or (user.group.description=="Admin" and group=="Moderator"):
            continue
        else:
            ret.append(user)
    serializer = UsersSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_likes(request):

    ret = Favorites.objects.all()
    serializer = FavoritesSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def verify_pub_like_by_user(request, pub_id):

    user_id = int(request.GET['user_id'])
    pub = Publications.objects.get(id=pub_id)
    author = Users.objects.get(id=user_id)
    try:
        ret=Favorites.objects.get(author=author,publication=pub)
    except Favorites.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FavoritesSerializer(ret)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_like(request, id):

    author=request.data["author"]
    request.data["author"]= Users.objects.get(id=author["id"]).id
    pub=request.data["publication"]
    request.data["publication"]=id
    serializer = FavoritesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_like(request, id):

    try:
        ret = Favorites.objects.get(id=id)
    except Favorites.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    ret.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_author_publications(request):

    id = int(request.GET['id'])
    try:
        author = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    publications= Publications.objects.all()
    ret = []
    for publication in publications:
        if publication.author == author:
            ret.append(publication)


    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)




@api_view(['GET'])
def get_search_publications_by_status(request, status):

    author = (request.GET['author'])
    title = (request.GET['title'])
    date = (request.GET['date'])
    topic = (request.GET['topic'])
    pubs = Publications.objects.all()
    if title:
        pubs = pubs.filter(title__contains=title)
    if date:
        pubs = pubs.filter(created_on__date=date)
    if author:
        pubs = pubs.annotate(full_name=Concat('author__first_name', V(' '), 'author__last_name')). \
            filter(full_name__contains=author)
    if topic:
        pubs = pubs.filter(topic__description__exact=topic)
    ret = []
    state = Publication_status.objects.get(description__exact=status)
    for publication in pubs:
        if publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_author_searched_publications_by_status(request, status):

    id = int(request.GET['id'])
    try:
        author = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    title = (request.GET['title'])
    date = (request.GET['date'])
    topic = (request.GET['topic'])
    pubs = Publications.objects.all()
    if title:
        pubs = pubs.filter(title__contains=title)
    if date:
        pubs = pubs.filter(created_on__date=date)

    if topic:
        pubs = pubs.filter(topic__description__exact=topic)
    ret = []
    state = Publication_status.objects.get(description__exact=status)
    for publication in pubs:
        if publication.status == state and publication.author==author:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_author_publications_by_status(request, status):

    id = int(request.GET['id'])
    try:
        author = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description__exact=status)
    for publication in publications:
        if publication.author == author and publication.status == state:
            ret.append(publication)
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_publication_by_status(request, status):

    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description__exact=status)
    for publication in publications:
        if  publication.status == state:
            ret.append(publication)
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_liked_publications(request):

    id = int(request.GET['id'])
    try:
        author = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    favoritos = Favorites.objects.all()
    ret = []
    for publication in favoritos:
        if publication.author == author  and publication.publication.status.description=="Approved":
            ret.append(publication.publication)
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)








@api_view(['GET'])
def search_user_liked_publications(request):

    id = int(request.GET['id'])
    author = (request.GET['author'])
    title = (request.GET['title'])
    date = (request.GET['date'])
    topic = (request.GET['topic'])
    pubs = Publications.objects.all()
    if title:
        pubs = pubs.filter(title__contains=title)
    if date:
        pubs = pubs.filter(created_on__date=date)
    if author:
        pubs = pubs.annotate(full_name=Concat('author__first_name', V(' '), 'author__last_name')). \
            filter(full_name__contains=author)
    if topic:
        pubs = pubs.filter(topic__description__exact=topic)
    try:
        author = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    favoritos = Favorites.objects.all()
    ret = []
    for publication in favoritos:
        if publication.author == author  and publication.publication in pubs:
            ret.append(publication.publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)