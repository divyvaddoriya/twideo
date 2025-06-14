import mongoose from "mongoose";

const categoryScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Category = mongoose.model("Category" , categoryScehma);