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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = void 0;
const itemModel_1 = require("../model/itemModel");
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield itemModel_1.Items.findAll();
        res.status(200).json({ success: true, message: items });
    }
    catch (err) {
        res.status(400).json({ success: false, message: "not get items" });
    }
});
exports.getItem = getItem;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        yield itemModel_1.Items.create({
            name: name,
            price: price
        });
        console.log("item created");
        return res.status(200).json({ success: true, message: "item created" });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: "item not created" });
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        yield itemModel_1.Items.update({
            name: name,
            price: price
        }, { where: { name: name } });
        console.log("item updated");
        return res.status(200).json({ success: true, message: "item updated" });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: "item not updated" });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body; //destructing the body
        yield itemModel_1.Items.destroy({ where: { name: name } });
        return res.status(200).json({ success: true, message: "item deleted" });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: "item not found" });
    }
});
exports.deleteItem = deleteItem;
