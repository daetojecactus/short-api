# Сервис для сокращения ссылок с REST API.

### Backend (REST API)

- `POST /shorten` — создание короткой ссылки
- `GET /:shortUrl` — переадресация на оригинальный URL
- `GET /info/:shortUrl` — получение информации по ссылке
- `DELETE /delete/:shortUrl` — удаление ссылки
- `GET /analytics/:shortUrl` — статистика переходов (кол-во и последние IP)

## Запуск

```bash
git clone https://github.com/daetojecactus/short-api.git
cd short-api
docker-compose up --build
```

Backend API: http://localhost:3000
Frontend UI: http://localhost:8000
