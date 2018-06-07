from accounts.models import UserProfile
from accounts.serializers import UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class UserSettings(generics.RetrieveAPIView):
    """View to get user settings found in UserProfile"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        queryset = UserProfile.objects.get(user=request.user)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)


class UserSettingsVacation(generics.GenericAPIView):
    """View to get, or change user vacation state"""
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        """Return vacation boolean state"""
        queryset = UserProfile.objects.get(user=request.user)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        """Set vacation state to true"""
        queryset = UserProfile.objects.get(user=request.user)
        if queryset.vacation is True:
            return Response(status=409)
        serializer = UserSerializer(queryset)
        queryset.vacation = True
        queryset.save()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        """Set vacation state to false"""
        queryset = UserProfile.objects.get(user=request.user)
        if queryset.vacation is False:
            return Response(status=409)
        serializer = UserSerializer(queryset)
        queryset.vacation = False
        queryset.save()
        return Response(serializer.data)
