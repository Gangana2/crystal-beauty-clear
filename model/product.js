import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    altName: {type: [String], default: []},
    price: {type: Number, required: true},
    labeledPrice: {type: Number, required: true},
    description: {type: String, required: true},
    images: {type: String, required: true, default: ["https://img.freepik.com/premium-photo/collection-makeup-beauty-products_250469-11096.jpg"]},
    stock: {type: Number, required: true},
});

const Product = mongoose.model('Product', productSchema);
export default Product;