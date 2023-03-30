from django.shortcuts import render
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


# Create your views here.
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# Métodos do Groups
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_group(request):
    groups = Groups.objects.all()

    # PROVAVELMENTE VAI SER PRECISO DIZER QUEM PEDIU PARA SABER QUE GRUPOS LHE MANDAR

    serializer = GroupsSerializer(groups, many=True)
    print(serializer)
    return Response(serializer.data)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_groupDescription(request):
    groups = Groups.objects.all()
    group = (request.GET['description'])

    ret = []
    for pub in groups:
        if pub.description == group or (pub.description == "Admin" and group == "Gestor"):
            continue
        else:
            ret.append(pub)
    print(ret)
    serializer = GroupsSerializer(ret, many=True)

    return Response(serializer.data)


# Métodos do User
@api_view(['POST'])
def create_user(request):
    print(request.data)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        ret = serializer.create(request.data)
        token = TokenSerializer(data={'key': ret.key})
        return Response(token.initial_data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request):
    id = request.data['id']
    try:
        user = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data["group"]=    request.data["group"]["id"]
    serializer = UsersSerializer(user, data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_users(request):
    users = Users.objects.all()
    # Devo precisar de saber quem me pediu para saber quantos lhe posso mostrar mas depois ponho isto
    # que agora ainda estou na fase de tentar meter tudo o que é preciso

    serializer = UsersSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_user(request):
    id = int(request.GET['id'])
    try:
        user = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UsersSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_by_username(request):
    username = request.GET['username']
    try:
        user = Users.objects.get(username=username)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UsersSerializer(user)
    return Response(serializer.data)

# Apagar users'?????

##Publication Status
# Nao vai ter create nem delete so vai ter gets


@api_view(['GET'])
def pub_status_getALl(request):
    ret = Publication_status.objects.all()
    serializer = PublicationStatusSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def pub_status_getOne(request):
    # Acho que é melhor fazer o get Pela descrição do que pelo id
    id = (request.GET['description'])
    try:
        ret = Publication_status.objects.get(description__exact=id)
    except Publication_status.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationStatusSerializer(ret)
    return Response(serializer.data)


## Publication Topics
@api_view(['GET'])
def get_pub_topic(request):
    # Penso que faça mais sentido fazer o get pela descrição do que pelo id
    id = int(request.GET['id'])
    try:
        ret = Publication_topics.objects.get(id=id)
    except Publication_topics.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationTopicsSerializer(ret)
    return Response(serializer.data)

@api_view(['GET'])
def get_pub_topic_by_description(request):
    description = int(request.GET['description'])
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


    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description="Por Aprovar")
    for publication in publications:
        if publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)



@api_view(['GET'])
def get_pub_topics_enabled(request):
    ret = Publication_topics.objects.all()
    enabled_topics = []
    for topic in ret:
        if topic.enabled:
            print(topic)
            enabled_topics.append(topic)
    serializer = PublicationTopicsSerializer(enabled_topics, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_pub_topics_create(request):
    print(request.data)

    serializer = PublicationTopicsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_pub_topics_update(request):
    # Não sei se vai ser pelo id se pela descrição, vou deixar pelo id e mais tarde troca-se se for preciso
    id = request.data['id']
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
def pub_topic_disable(request):
    id = request.data['id']
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
def pub_topic_enable(request):
    id = request.data['id']
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



##PUBLICATION
@api_view(['GET'])
def pub(request):
    id = int(request.GET['id'])
    try:
        ret = Publications.objects.get(id=id)
    except Publications.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublicationsSerializer(ret)
    return Response(serializer.data)


@api_view(['GET'])
def pubs(request):
    ret = Publications.objects.all()
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def pubcreate(request):
    print(request.data)
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
def pubupd(request):
    pid =request.data['id']

    autor=request.data["author"]
    topic=request.data["topic"]
    status=request.data["status"]
    try:
        ret = Publications.objects.get(id=pid)
    except Publications.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data["author"]=(autor["id"])
    request.data["topic"]=(topic["id"])
    print(request.data["status"])
    request.data["status"] = (status["id"])
    serializer = PublicationsSerializer(ret, data=request.data)

    if serializer.is_valid():
        serializer.save()
        print("FIZ SAVE")
        return Response(serializer.data)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




##COMMENTS
# NOS NO OUTRO PROJETO NÃO TINHAMOS O UPDATE DE UM COMENTÁRIO não sei se querem colocar ou não, se quiserem
# depois meto
@api_view(['GET'])
def comment(request):
    id = int(request.GET['id'])
    try:
        ret = Comments.objects.get(id=id)
    except Comments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentsSerializer(ret)
    return Response(serializer.data)


@api_view(['GET'])
def comments(request):
    ret = Comments.objects.all()
    serializer = CommentsSerializer(ret, many=True)
    return Response(serializer.data)

#Código para obter os comentários de uma publicação
@api_view(['GET'])
def commentsPublication(request):
    id = int(request.GET['id'])  # ID DA PUBLICAÇÃO
    ret = Comments.objects.all()
    retorno = []
    for x in ret:
        if x.publication.id == id:
            retorno.append(x)
    serializer = CommentsSerializer(retorno, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def commentcre(request):
    request.data["author"]=request.data["author"]["id"]
    request.data["publication"]=request.data["publication"]["id"]
    serializer = CommentsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def commentdel(request,id):
    try:
        ret = Comments.objects.get(id=id)
    except Comments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    ret.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


## FAVORITOS
# Aqui não faz sentido ter updates, porque ou é favorito ou não é

@api_view(['GET'])
def fav(request):
    id = int(request.GET['id'])
    try:
        ret = Favorites.objects.get(id=id)
    except Favorites.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FavoritesSerializer(ret)
    return Response(serializer.data)

@api_view(['GET'])
def getSearchUsers(request):
    group = (request.GET['group'])
    topic = (request.GET['topic'])
    name = (request.GET['name'])
    username = (request.GET['username'])
    pubs = Users.objects.all()
    if topic != 'null':
        pubs = pubs.filter(group__description__exact=topic)
    if username!= 'null' :
        pubs = pubs.filter(username__contains=username)
    if name != 'null':
        pubs = pubs.annotate(full_name=Concat('first_name', V(' '), 'last_name')). \
            filter(full_name__contains=name)
    ret=[]
    for pub in pubs:
        if pub.group.description==group or (pub.group.description=="Admin" and group=="Gestor"):
            continue
        else:
            ret.append(pub)
    serializer = UsersSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSearchUsersPossible(request):
    group = (request.GET['group'])

    pubs = Users.objects.all()

    ret=[]
    for pub in pubs:
        if pub.group.description==group or (pub.group.description=="Admin" and group=="Gestor"):
            continue
        else:
            ret.append(pub)
    serializer = UsersSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def favs(request):
    ret = Favorites.objects.all()
    serializer = FavoritesSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def checkIfFavorite(request):

    id = int(request.GET['id'])
    user_id = int(request.GET['user_id'])
    pub = Publications.objects.get(id=id)
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
def favcre(request):
    print(request.data)
    author=request.data["author"]
    request.data["author"]= Users.objects.get(id=author["id"]).id
    pub=request.data["publication"]
    request.data["publication"]=Publications.objects.get(id=pub["id"]).id
    serializer = FavoritesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def favdel(request,id):

    try:

        ret = Favorites.objects.get(id=id)
    except Favorites.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    ret.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAuthorPublications(request):
    id = int(request.GET['id'])
    try:
        autor = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    publications= Publications.objects.all()
    ret = []
    for publication in publications:
        if publication.author == autor:
            ret.append(publication)


    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAuthorPublicationsApproved(request):
    id = int(request.GET['id'])
    try:
        user = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description="Aprovado")
    for publication in publications:
        if publication.author == user and publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAuthorPublicationsPendent(request):
    id = int(request.GET['id'])
    try:
        autor = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description="Por Aprovar")
    for publication in publications:
        if publication.author == autor and publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPublicationsPendent(request):

    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description="Por Aprovar")
    for publication in publications:
        if publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPublicationsApproved(request):
    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description="Aprovado")
    for publication in publications:
        if publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSearchPublicationsApproved(request):
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
    state = Publication_status.objects.get(description="Aprovado")
    for publication in pubs:
        if publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSearchPublicationsPendent(request):
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
    state = Publication_status.objects.get(description="Por Aprovar")
    for publication in pubs:
        if publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSearchPublicationsFilled(request):
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
    state = Publication_status.objects.get(description="Arquivado")
    for publication in pubs:
        if publication.status == state:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSearchPublicationsPendentByUser(request):
    id = int(request.GET['id'])
    try:
        autor = Users.objects.get(id=id)
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
    state = Publication_status.objects.get(description="Por Aprovar")
    for publication in pubs:
        if publication.status == state and publication.author==autor:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSearchPublicationsApprovedByUser(request):
    id = int(request.GET['id'])
    try:
        autor = Users.objects.get(id=id)
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
    state = Publication_status.objects.get(description="Aprovado")
    for publication in pubs:
        if publication.status == state and publication.author==autor:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSearchPublicationsFilledByUser(request):
    id = int(request.GET['id'])
    try:
        autor = Users.objects.get(id=id)
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
    state = Publication_status.objects.get(description="Arquivado")
    for publication in pubs:
        if publication.status == state and publication.author==autor:
            ret.append(publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAuthorPublicationsArquivadas(request):
    id = int(request.GET['id'])
    try:
        autor = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description="Arquivado")
    for publication in publications:
        if publication.author == autor and publication.status == state:
            ret.append(publication)
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPublicationsArquivadas(request):

    publications = Publications.objects.all()
    ret = []
    state = Publication_status.objects.get(description="Arquivado")
    for publication in publications:
        if  publication.status == state:
            ret.append(publication)
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAuthorFavoritePublications(request):
    id = int(request.GET['id'])
    try:
        autor = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    favoritos = Favorites.objects.all()
    ret = []
    for publication in favoritos:
        if publication.author == autor  and publication.publication.status.description=="Aprovado":
            ret.append(publication.publication)
    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)








@api_view(['GET'])
def getSearchPublicationsFavorites(request):
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
        autor = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    favoritos = Favorites.objects.all()
    ret = []
    for publication in favoritos:
        if publication.author == autor  and publication.publication in pubs:
            ret.append(publication.publication)

    serializer = PublicationsSerializer(ret, many=True)
    return Response(serializer.data)