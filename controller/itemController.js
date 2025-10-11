import itemModel from "../model/item.js";

export function getItems(req, res) {
    itemModel.find().then(
        (items) => {
            res.json(items);
        }
    ).catch(
        () => {
            res.json({ message: 'error while fetching items data' });
        }
    )
}

export function saveitems(req, res) {
    const item = new itemModel(req.body);
    item.save().then(
        () => {
            res.json({ message: 'item data inserted successfully' });
        }
    ).catch(
        () => {
            res.json({ message: 'error while inserting item data' });
        }
    )
}

export function updateItem(req, res) {
    res.json({ message: 'this is put request from item controller' });
}

export function deleteItem(req, res) {
    res.json({ message: 'this is delete request from item controller' });
}