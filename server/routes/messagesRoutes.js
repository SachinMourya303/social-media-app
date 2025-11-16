import express from "express";
import ChatRoomModel from "../models/messagesModel.js";

const messageRoutes = express.Router();

messageRoutes.post("/send", async (req, res) => {
    try {
        const { roomId, senderId, receiverId, message } = req.body;

        if (!roomId || !senderId || !receiverId || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let room = await ChatRoomModel.findOne({ roomId });

        if (!room) {
            room = await ChatRoomModel.create({
                roomId,
                users: { senderId, receiverId },
                messages: [{ senderId, message }]
            });
        } else {
            room.messages.push({ senderId, message });
            await room.save();
        }

        return res.status(200).json({ success: true, room });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default messageRoutes;
