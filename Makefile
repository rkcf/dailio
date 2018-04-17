devserver:
	tmux new-session '. backend/.venv/bin/activate && source conf/dev-env.env && python backend/manage.py runserver' \; split-window 'cd frontend && npm run dev'

testapi:
	cd backend && python manage.py test

migrations:
	cd backend && python manage.py makemigrations && python manage.py migrate

backupdb:
	sqlite3 backend/db/db.sqlite3 ".backup 'backend/db/backup_db.sqlite3'"

buildfrontend:
	cd frontend && npm run build

buildbackend:
	docker-compose build

clean:
	rm -rf dist/*
	docker volume rm dailio_dailio-static

buildall: clean buildfrontend buildbackend
