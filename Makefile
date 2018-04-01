devserver:
	tmux new-session 'source backend/.env && python backend/manage.py runserver' \; split-window 'cd frontend && npm run dev'
