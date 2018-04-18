#!/bin/sh
docker exec dailio_django-wsgi_1 sh -c "cd dailio && python3 manage.py resetTaskCompletion"

