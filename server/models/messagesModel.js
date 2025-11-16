import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    users: {
        senderId: { type: String, required: true },
        receiverId: { type: String, required: true },
    },
    messages: [
        {
            senderId: String,
            message: String,
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps : true
});

const ChatRoomModel = mongoose.models.chatroom || mongoose.model("chatroom", ChatRoomSchema);
export default ChatRoomModel;
