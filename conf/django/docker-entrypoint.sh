#!/bin/sh
#copy staticfiles
python3 dailio/manage.py collectstatic --no-input

#run migrations
python3 dailio/manage.py migrate --no-input
uwsgi --ini /var/www/uwsgi.ini
