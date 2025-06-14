import mongoose from "mongoose";
import { User } from "../user.model.js";
import { Subtodo } from "./subtodo.model.js";

const todoScehma = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subTodo: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtodo"
    } ] 
} , {timestamps: true})

export const Todo = mongoose.model("Todo" ,todoScehma);

