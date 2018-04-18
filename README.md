dailio
======
A self hosted daily task web app.

##Use
The key to forming new habits is repetition and consistency.  Completing a task every day will help form positive behavioral patterns.  Eventually completion of this task will become automatic.

1. Create a task.
2. Complete the task.
3. Every day the task completion resets, keep completing them to watch your streak counter go up.

##Deployment

Edit conf/nginx/nginx.conf to change the server_name in the server block.

Edit conf/production-env.env to change the DJANGO_SECRET_KEY

###With Docker
`docker-compose up`
Add bin/dailio-docker-cron-reset.sh to your daily crontab
And you should be good to go.

###Manual
Copy backend code to /var/www/dailio
Copy dist to /var/www/webpack-static
Copy conf/django/uwsgi.ini to /var/www/

Install dependencies `pip install -r backend/requirements.txt`

Source the environment variables `source conf/production-env.env`

Collect static resources and create the database:
```
python manage.py collectstatic
python manage.py migrate
```

Start app server with `uwsgi --ini /var/www/uwsgi.ini`

Copy conf/nginx/nginx.conf to /etc/nginx

Start nginx

##Contributing
Install Dependencies
```
cd frontend
npm install
cd ../backend
virtualenv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

Build static frontend components `make buildfrontend`

A dev server can be started up with `make devserver` (tmux required)

Tests can be run with `make testall`
