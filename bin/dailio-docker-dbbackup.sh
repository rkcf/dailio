#!/bin/sh
# Create a backup of the dailio db at the BACKUP_LOCATION on the host
BACKUP_LOCATION="$PWD"
DATE=`date +%d-%m-%y`
docker run --rm  --volumes-from dailio_django-wsgi_1 \
	-v $BACKUP_LOCATION:/backup \
	tcgerlach/sqlite \
	/var/www/dailio/db/db.sqlite3 ".backup '/backup/backup_db_$DATE.sqlite3'"
