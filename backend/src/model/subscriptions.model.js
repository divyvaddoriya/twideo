import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    subscriber: {
        type: mongoose.Schema.Types.ObjectId, //onw who is subscribing to other channel
        ref: "User"
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId, //one who is owner of the channel
        ref: "User"
    },

} , {timestamps : true})

export const Subscriptions = mongoose.model("Subscription" , subscriptionSchema);