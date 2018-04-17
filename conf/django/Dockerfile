FROM alpine:3.7

#install build deps
RUN apk add --no-cache python3 gcc musl-dev python3-dev linux-headers\
	&& pip3 install --no-cache-dir --upgrade pip

#create environment & user
WORKDIR /var/www
RUN adduser -D -s /sbin/nologin -h /var/www uwsgi

#add source to container
COPY conf/django/uwsgi.ini /var/www/uwsgi.ini
COPY conf/django/docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
COPY backend /var/www/dailio

#install app deps
RUN pip3 install --no-cache-dir -r dailio/requirements.txt

#add webpack generated assets
COPY dist/webpack-static /var/www/webpack-static
COPY dist/webpack-stats.json /var/www/webpack-stats.json

RUN chown -R uwsgi:uwsgi /var/www

USER uwsgi
RUN mkdir /var/www/static
VOLUME /var/www/static
VOLUME /var/www/dailio/db

EXPOSE 8000

ENTRYPOINT docker-entrypoint.sh
