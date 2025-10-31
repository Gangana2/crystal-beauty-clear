import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    oderId: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    email: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    satatus: {type: String, required: true, default: "pending"},
    phoneNumber: {type: String, required: true},
    billItems: {
        type: [{ 
            productId: String,
            productName: String,
            image: String,
            quantity: Number,
            price: Number
         }],
        required: true,
        total: {type: Number, required: true}
    
    },

})

const Order = mongoose.model('Order', orderSchema);
export default Order;