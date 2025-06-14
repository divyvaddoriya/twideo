import mongoose from "mongoose";

const productScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
    },
    price: {
      type: Number,
      default: 0  
    },
    stock: {
        type: Number,
        default: 0,
    },
    cateogory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true})

export const Product = mongoose.model("Product" , productScehma);