"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const itemModel_1 = require("../model/itemModel");
const authModel_1 = require("../model/authModel");
const item_1 = __importDefault(require("../routes/item"));
const auth_1 = __importDefault(require("../routes/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const app = (0, express_1.default)();
//database connection
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield itemModel_1.Items.sync();
            yield authModel_1.User.sync();
            console.log('Connection to the database has been established successfully.');
        }
        catch (err) {
            console.log("unable to connect to database: ", err);
        }
    });
}
// Middleware function for error handling
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}
// Middleware function for request logging
function requestLogger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
// middleware function for authentication
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.default = authenticate;
// Use the middleware functions in the application
app.use(express_1.default.json()); // Parse JSON request bodies
app.use(requestLogger); // Log incoming requests  
app.use(errorHandler);
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Authentication using routers
app.use("/auth", auth_1.default); //login,logout,regiter
app.use('/', item_1.default); //CRUD operations
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDb();
    console.log("server is running on port 3000");
}));
