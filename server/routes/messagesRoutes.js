import express from "express";
import Message from "../models/messagesModel.js";

const router = express.Router();

// get all messages for a room
router.get("/:roomId", async (req, res) => {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.json(messages);
});

// save a message
router.post("/", async (req, res) => {
    const msg = await Message.create(req.body);
    res.json(msg);
});

export default router;
