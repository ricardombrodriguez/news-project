from app.models import Groups, Users, Publication_status, Publication_topics, Publications, Comments, Favorites
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import serializers


class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ('id','description')


class PublicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication_status
        fields = ('id','description')


class PublicationTopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication_topics
        fields = ('id','description','enabled')


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id','username','first_name', 'last_name', 'group')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['group'] = GroupsSerializer(Groups.objects.get(id=data['group'])).data
        return data

class PublicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publications
        fields = ('id','title','content', 'created_on', 'author','status','topic')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['topic'] = PublicationTopicsSerializer(Publication_topics.objects.get(id=data['topic'])).data
        data['author'] = UsersSerializer(Users.objects.get(id=data['author'])).data
        data['status'] = PublicationStatusSerializer(Publication_status.objects.get(id=data['status'])).data
        return data

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id','comment','author', 'publication')
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['publication'] = PublicationsSerializer(Publications.objects.get(id=data['publication'])).data
        data['author'] = UsersSerializer(Users.objects.get(id=data['author'])).data
        return data

class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ('id','author','publication')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['publication'] = PublicationsSerializer(Publications.objects.get(id=data['publication'])).data
        data['author'] = UsersSerializer(Users.objects.get(id=data['author'])).data
        return data


class FavoritesSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ('author', 'publication')


    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['publication'] = PublicationsSerializer(Publications.objects.get(id=data['publication'])).data
        data['author'] = UsersSerializer(Users.objects.get(id=data['author'])).data
        return data



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(username=validated_data['username'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        user.set_password(validated_data['password'])
        user.is_active = True
        user.save()
        group = Groups.objects.get(description__exact="Leitor")
        u = Users(first_name=validated_data['first_name'], last_name=validated_data['last_name'],
                  username=validated_data['username'], group=group)
        u.save()
        return Token.objects.get(user=user)


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key',)
