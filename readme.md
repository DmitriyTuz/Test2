1. Установить: 1) NodeJS - v.14.19.0;
               2) Postgres - v.12.12
2. Команды для Node в терминале среды разработки:
    - nmp install (для установки нужных модулей)
    - npx sequelize-cli db:migrate (для запуска миграций - в ней создаётся таблица User)
    - npm start (запуск)
3. Проверял используя Postmen

P.S.: 
- все роуты в постмене вводить через user - например для функции signin - http://localhost:5000/user/signin
для остальных по заданию аналогично
- файл .env запушил - для тестового думаю не страшно
