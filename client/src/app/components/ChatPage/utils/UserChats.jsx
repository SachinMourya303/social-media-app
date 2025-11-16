import { setRightOutletBox } from '@/app/stateManagement/slice/popupSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { socket } from '@/socket';
import { fetchMessageRequest, sendMessageRequest } from '@/utils/sendMessage';
import { ChevronLeft, SendHorizonal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserChats = () => {
    const messageId = useSelector(state => state.popup.messageId);
    const followers = useSelector(state => state.users.followers);
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    const followButtonLoading = useSelector(state => state.users.followButtonLoading);
    const dispatch = useDispatch();

    const userMessage = followers.filter(user => user._id === messageId);
    const senderId = userDetails?.users._id;
    const receiverId = messageId;
    const roomId = [senderId, receiverId].sort().join("_"); // FIXED roomId

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const fetchMessage = async () => await fetchMessageRequest(dispatch, setChat);

    const sendMessage = async () => {
        socket.emit("send_message", { roomId, senderId, receiverId, message }); // REAL-TIME SEND
        await sendMessageRequest(dispatch, roomId, senderId, receiverId, message, setMessage);
        await fetchMessage();
    };

    useEffect(() => {
        socket.emit("join_room", roomId);
        fetchMessage();
    }, [roomId]);

    useEffect(() => {
        socket.on("receive_message", data => {
            if (data.roomId === roomId) {
                setChat(prev => {
                    const updated = [...prev];
                    const room = updated.find(r => r.roomId === roomId);
                    if (room) room.messages.push({ senderId: data.senderId, message: data.message, timestamp: new Date() });
                    return [...updated];
                });
            }
        });
        return () => socket.off("receive_message");
    }, []);

    return (
        <div className='w-full h-100 flex flex-col justify-between'>
            <div className={`flex w-full justify-between items-center border-b pb-2 ${darkmode ? 'border-darkmode-text/50' : 'border-gray-200'}`}>
                <div className='flex gap-2 items-center'>
                    <figure className='w-12 h-12 rounded-full overflow-hidden'>
                        {userMessage[0]?.profile !== null ? (
                            <img src={userMessage[0]?.profile} alt="profile" className='w-full h-full object-cover object-center' />
                        ) : (
                            <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                        )}
                    </figure>
                    <figcaption className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{userMessage[0]?.username}</figcaption>
                </div>
                <Button onClick={() => dispatch(setRightOutletBox('chatpage'))} className={`bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                    <ChevronLeft className='size-7' />
                </Button>
            </div>

            <div className="w-full h-full">
                {chat
                    .filter(c => c.users.senderId === messageId || c.users.receiverId === messageId)
                    .flatMap(c =>
                        [...c.messages]
                            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // SORT FIX
                            .map((m, i) => (
                                <div key={i} className={`mt-5 ${m.senderId === senderId ? 'text-end' : 'text-start'}`}>
                                    <span className='bg-blue-200 p-2 rounded-lg'>{m.message}</span>
                                </div>
                            ))
                    )}
            </div>

            <div className='border rounded-full w-full flex items-center p-1'>
                <Input onChange={e => setMessage(e.target.value)} value={message} className='outline-none border-0 shadow-none ring-0!' placeholder='Say hi' />
                <Button onClick={sendMessage} className='rounded-full cursor-pointer'>
                    {followButtonLoading ? <Spinner /> : <SendHorizonal />}
                </Button>
            </div>
        </div>
    );
};

export default UserChats;
