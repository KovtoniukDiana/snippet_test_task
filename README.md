Додаток для зберігання та керування сніпетами. 

Технологічний стек: 
frontend: Next.js.
backend: NestJS, MongoDB (Mongoose).
infrastructure: Docker (для бази даних).

Запуск проєкту:

*Коренева папка проєкту:
-запуск бази: docker-compose up -d
-перевірка: docker ps

*Backend (/backend): 
-встановлення залежностей (npm install) 
-команда запуску бекенду: npm run start:dev

*Frontend (/frontend): 
-встановлення залежностей (npm install) 
-команда запуску фронтенду: npm run dev

API ендпоінти:
GET-метод: /api/snippets - Отримати всі сніпети
GET-метод: /api/snippets/:id - Отримати конкретний сніпет
POST-метод: /api/snippets - Створити новий сніпет
PATCH-метод: /api/snippets/:id - Редагувати існуючий сніпет
DELETE-метод: /api/snippets/:id - Видалити сніпет

Якщо потрібно запустити проєкт в прод-режимі:
*Backend (/backend):
-npm run build
-npm run start:prod

*Frontend (/frontend):
-npm run build
-npm run start

