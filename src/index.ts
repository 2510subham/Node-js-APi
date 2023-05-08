import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { Items } from '../model/itemModel';
import {User} from '../model/authModel'
import itemrouter from '../routes/item';
import authroutes from '../routes/auth';
import fs from 'fs';
import jwt from "jsonwebtoken";
import 'dotenv/config';

const app = express();

//database connection
async function connectToDb() {
    try {
        
        await Items.sync();
        await User.sync();
        console.log('Connection to the database has been established successfully.');
    }
    catch (err) {
        console.log("unable to connect to database: ", err);
    }
}

// Middleware function for error handling
function errorHandler(err: any, req: any, res: any, next: any) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}

// Middleware function for request logging
function requestLogger(req: any, res: any, next: any) {
    console.log(`${req.method} ${req.url}`);
    next();
}

// middleware function for authentication
export default function authenticate(req:any, res:any, next:any) {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const JWT_SECRET_KEY:any=process.env.JWT_SECRET_KEY;
      jwt.verify(token, JWT_SECRET_KEY, (err:any, user:any) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }


// Use the middleware functions in the application
app.use(express.json()); // Parse JSON request bodies
app.use(requestLogger); // Log incoming requests  
app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: true }))

// Authentication using routers
app.use("/auth",authroutes); //login,logout,regiter
app.use('/',itemrouter); //CRUD operations



app.listen(3000,async () => {
   await connectToDb();
    console.log("server is running on port 3000");
})