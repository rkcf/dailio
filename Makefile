devserver:
	tmux new-session 'source backend/.env && python backend/manage.py runserver' \; split-window 'cd frontend && npm run dev'

testapi:
	cd backend && python manage.py test

migrations:
	cd backend && python manage.py makemigrations && python manage.py migrate
