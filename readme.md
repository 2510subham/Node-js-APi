**Node.js API**

This is a Node.js API that uses Sequelize for database management, JWT for user authentication, and middleware for common tasks. The API provides endpoints for CRUD operations for items ,all crud operation is done through Mysql and using ORM Sequelise, it contains api endpoints for user registration, login, and logout.

**Getting started**

1)Clone the repository

2)Install dependencies: npm install

3)Create a .env file in the root directory 

4)Go to index.ts where all of the routes managed 

5)Start the server: npm start

6)Open your browser or API testing tool and navigate to http://localhost:3000 to access the API.

**API Endpoints**

1)Create-> "/"

2)Read->"/newitems"

3)Update->"/updateitems"

4)Delete->"/deleteitems"


5)register->"/auth/register"

6)login->"/auth/login"

7)logout->"/auth/logout"


**Middleware**

This API also includes the following middleware functions:

1)errorHandler: Handles errors and returns appropriate responses to the client.

2)requestLogger: Logs each incoming request to the console.


**Technologies Used**

1)Node.js

2)Express.js

3)SQL

4)JSON Web Tokens (JWT)

5)Sequelise







