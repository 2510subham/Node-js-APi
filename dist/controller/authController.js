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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authModel_1 = require("../model/authModel");
const config_1 = require("../src/config");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        //hashing
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const user = yield authModel_1.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(200).json({ success: true, message: "successfully registered" });
    }
    catch (err) {
        res.status(404).json({ success: false, message: "failed to register", error: err });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const user = yield authModel_1.User.findAll({ where: { email: email } });
        //if user does not exist
        if (!user) {
            return res.status(404).send({ success: false, message: "user does not exist" });
        }
        //if user exists then compare the password
        const validPassword = yield bcryptjs_1.default.compare(req.body.password, user[0].dataValues.password);
        //if not correct
        if (!validPassword) {
            return res.status(404).send({ success: false, message: "wrong password" });
        }
        //if correct
        //create jwt token
        const token = jsonwebtoken_1.default.sign({ id: user[0].dataValues.id }, config_1.JWT_SECRET_KEY, { expiresIn: "1h" });
        //set the token in the header
        res.set('Authorization', `Bearer ${token}`);
        return res.status(200).json({ success: true,
            token
        });
    }
    catch (err) {
        return res.status(404).json({ success: false, message: 'Invalid credentials' });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Set-Cookie', 'token=; Max-Age=-1');
    res.status(200).send("logged out successfully");
});
exports.logoutUser = logoutUser;
