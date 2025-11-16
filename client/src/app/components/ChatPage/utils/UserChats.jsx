import React, { useEffect, useState } from 'react';
import { socket } from '@/socket';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal, ChevronLeft } from 'lucide-react';
import { setRightOutletBox } from '@/app/stateManagement/slice/popupSlice';
import { websiteLogo } from '@/assets/assets';

const UserChats = () => {
    const messageId = useSelector(state => state.popup.messageId);
    const followers = useSelector(state => state.users.followers);
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    const loggedUser = useSelector(state => state.users.loggedUser);

    const dispatch = useDispatch();

    const userMessage = followers.filter((u) => u._id === messageId)[0];
    const roomId = [userDetails?._id, messageId].sort().join("_");

    const [messages, setMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState("");

    useEffect(() => {
        socket.emit("join_room", roomId);
    }, [roomId]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URI}/messages/${roomId}`).then((res) => {
            setMessages(res.data);
        });
    }, [roomId]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
        return () => socket.off("receive_message");
    }, []);

    const sendMessage = async () => {
        if (!currentMsg.trim()) return;

        const msgData = {
            roomId,
            senderId: loggedUser._id,
            receiverId: messageId,
            message: currentMsg
        };

        socket.emit("send_message", msgData);
        setMessages((prev) => [...prev, msgData]);

        await axios.post(`${import.meta.env.VITE_API_URI}/messages`, msgData);
        setCurrentMsg("");
    };

    return (
        <div className="flex flex-col h-100 justify-between">

            <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-4">
                    <img
                        src={userMessage?.profile || websiteLogo.dummyUserIcon}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <strong>{userMessage?.username}</strong>
                </div>
                <Button onClick={() => dispatch(setRightOutletBox('chatpage'))}>
                    <ChevronLeft className="size-7" />
                </Button>
            </div>

            <div className="w-full h-full">
                {messages?.map((msg, i) => (
                    <div key={i}>
                        <div>
                            {msg.senderId === loggedUser._id &&
                                <div className='w-full flex justify-end mt-2'>
                                    <span className='bg-blue-200 rounded-tr rounded-lg py-2 px-5'>{msg.message}</span>
                                </div>
                            }
                        </div>
                         <div>
                            {msg.senderId !== loggedUser._id &&
                                <div className='w-full flex justify-start mt-2'>
                                    <span className='bg-blue-200 rounded-tl rounded-lg py-2 px-5'>{msg.message}</span>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 p-2 border-t">
                <Input
                    value={currentMsg}
                    onChange={(e) => setCurrentMsg(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                />
                <Button onClick={sendMessage}>
                    <SendHorizonal />
                </Button>
            </div>
        </div>
    );
};

export default UserChats;
