import express from "express";
import { getItems, saveitems, updateItem, deleteItem, goodItems, searchItems } from '../controller/itemController.js';

const itemRouter = express.Router();

itemRouter.get('/', getItems);
itemRouter.post('/', saveitems);
itemRouter.put('/', updateItem);
itemRouter.delete('/', deleteItem);
itemRouter.get('/good',goodItems);
//itemRouter.get('/search',searchItems);

//postman eke url eken enna gahana widiyata enna hadanawa
itemRouter.get('/:name',searchItems)

export default itemRouter;
