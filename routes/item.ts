import express from 'express';
const router =express.Router();
import {getItem,createItem,updateItem,deleteItem} from '../controller/itemController';
import authenticate from '../src/index';


router.get("/",getItem)

router.post("/newitems",createItem)

router.put("/updateitems",updateItem)

router.delete("/deleteitems",deleteItem)

export default router;
