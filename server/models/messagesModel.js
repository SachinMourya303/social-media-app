import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    roomId: String,
    senderId: String,
    receiverId: String,
    message: String,
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
