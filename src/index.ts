import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import { Items } from './model';
import {User} from './authModel'
import { createItem, updateItem } from './controller';
import authroutes from './authController';
import jwt from "jsonwebtoken";
import 'dotenv/config';
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




// CRUD operations with sequelize
app.get("/api", async (req: any, res: any) => {
    try {
        const items = await Items.findAll();
        res.status(200).json(items);
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/api/newitems", async (req: any, res: any) => {
    console.log(req.body);
    const { name, price } = req.body;//destructing the body
    if (await createItem(name, price)) {
        return res.status(200).json({success: true, message: "item created" });
    }
    return res.status(400).json({success: false, message: "item not created" });
})

app.put("/api/updateitems", async (req: any, res: any) => {
    console.log(req.body);
    const { name, price } = req.body;//destructing the body
    if (await updateItem(name, price))
        return res.status(200).json({success: true, message: "item updated" });
    return res.status(400).json({success: false, message: "item not updated" });
})

app.delete("/api/deleteitems", async (req: any, res: any) => {
    console.log(req.body);
    const { name } = req.body;//destructing the body
    if (await Items.destroy({ where: { name: name } }))
        return res.status(200).json({success: true, message: "item deleted" });
    return res.status(400).json({success: false, message: "item not found" });
})

app.listen(3000,async () => {
   await connectToDb();
    console.log("server is running on port 3000");
})