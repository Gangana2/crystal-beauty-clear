import express from "express";
import { getItems, saveitems, updateItem, deleteItem } from '../controller/itemController.js';

const itemRouter = express.Router();

itemRouter.get('/', getItems);
itemRouter.post('/', saveitems);
itemRouter.put('/', updateItem);
itemRouter.delete('/', deleteItem);

export default itemRouter;
