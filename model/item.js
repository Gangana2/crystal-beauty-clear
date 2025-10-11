import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const itemModel = mongoose.model("items", itemSchema);
export default itemModel;