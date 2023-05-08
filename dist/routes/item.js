"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const itemController_1 = require("../controller/itemController");
router.get("/", itemController_1.getItem);
router.post("/newitems", itemController_1.createItem);
router.put("/updateitems", itemController_1.updateItem);
router.delete("/deleteitems", itemController_1.deleteItem);
exports.default = router;
