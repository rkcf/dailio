from rest_framework import serializers
from accounts.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    """ User profile information serializer """
    class Meta:
        model = UserProfile
        fields = ('vacation', 'user')
