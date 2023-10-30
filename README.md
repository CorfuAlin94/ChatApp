# ChatApp - Getting Started - ENG

First you will need to install all dependencies. So run "npm install" in both client & server.

# Server :

1. In config/config.json it requires you to create a db in sql with the following:

   "username": "root",
   "password": "password",
   "database": "chatApp",
   
3. To use sequelize you will need to migrate the existing data using "sequelize db:migrate" and to use the seeders you will need to use "sequelize db:seed:all"

   2.1. To undo the migration use: "sequelize db:migrate:undo:all" then run the commands from point 2 to reinit the migration

4. In a terminal that has the server root (the whole folder) run "npm run dev" to run the server via nodemon.

All dependencies are used in the latest version so no need to modify the packages ALSO you will see the prisma dependency, it is used for managing a webpack error.

# Client

1. excepting the npm install part you will not need anything (Semantic UI is used via link)

2. In another terminal that has the client root run "npm start" to run the client.

# How to use:

To use the Chat app you can make an account via the registration from or use an existing one (all user details can be found in the seeders folder with the name - 20230326102345-create-users)

# Tehnologies Used:
Javascript, React, Sequelizer, Apollo, MySQL, Bcrypt, JSONWebToken, Node.js

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#  ChatApp - Noțiuni introductive - RO

Mai întâi va trebui să instalați toate dependențele. Deci, rulați „npm install” atât în client, cât și în server.

# Server :

1. În config/config.json, este necesar să creați un db în sql cu următoarele:

   "username": "root",
   "password": "password",
   "database": "chatApp",

2. Pentru a utiliza sequelize, va trebui să migrați datele existente utilizând „sequelize db:migrate” și pentru a utiliza seederii, va trebui să utilizați „sequelize db:seed:all”

2.1. Pentru a anula migrarea, utilizați: „sequelize db:migrate:undo:all” apoi rulați comenzile de la punctul 2 pentru a reinițializa migrarea

3. Într-un terminal care are rădăcina server (adică tot folderul) , rulați „npm run dev” pentru a rula serverul prin nodemon.

Toate dependențele sunt utilizate în cea mai recentă versiune, așa că nu este nevoie să modificați pachetele, DE asemenea, veți vedea dependența "prisma", este folosită pentru gestionarea unei erori din webpack.

# Client

1. Cu excepția părții de npm install, nu veți avea nevoie de nimic (interfața de utilizare semantică este folosită prin link)

2. Într-un alt terminal care are rădăcina client rulați „npm start” pentru a rula clientul.

# Cum se utilizează:

Pentru a utiliza aplicația de Chat, vă puteți crea un cont prin înregistrare sau utilizați unul existent (toate detaliile utilizatorului pot fi găsite în folderul seeders cu numele - 20230326102345-create-users)

# Tehnologii Folosite:
Javascript, React, Sequelizer, Apollo, MySQL, Bcrypt, JSONWebToken, Node.js
