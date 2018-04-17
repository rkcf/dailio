FROM alpine:3.7

RUN apk add --no-cache nginx

#forward logs for docker
RUN ln -s -sf /dev/stdout /var/lib/nginx/logs/access.log \
	&& ln -sf /dev/stderr /var/lib/nginx/logs/error.log

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
