run migrations
npx sequelize-cli db:migrate --migrations-path ./src/migrations --config ./src/config/config.json

create table 
npx sequelize-cli model:generate --name (tên bảng) --attribute (tên dòng: thuộc tính*) --models-path ./src/models --migrations-path ./src/migrations 

detele all table in sql
npx sequelize-cli db:migrate:undo:all --migrations-path ./src/migrations --config ./src/config/config.json

detele migrations just running
npx sequelize-cli db:migrate:undo --migrations-path ./src/migrations --config ./src/config/config.json


* vd: username:string 

npx sequelize-cli model:generate --name Albums --attribute title: string, img: string, artist_id: integer, release_date: integer --models-path ./src/models --migrations-path ./src/migrations 