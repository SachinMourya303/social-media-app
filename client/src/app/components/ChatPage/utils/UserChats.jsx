import { setRightOutletBox } from '@/app/stateManagement/slice/popupSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, SendHorizonal } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UserChats = () => {
    const messageId = useSelector(state => state.popup.messageId);
    const followers = useSelector((state) => state.users.followers);
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    const dispatch = useDispatch();

    const userMessage = followers.filter((user) => user._id === messageId);

    return (
        <div className='w-full h-100 flex flex-col justify-between'>
            <div className={`flex w-full justify-between items-center border-b pb-2 ${darkmode ? 'border-darkmode-text/50' : 'border-gray-200'}`}>
                <div className='flex gap-2 items-center'>
                    <figure className='w-12 h-12 rounded-full overflow-hidden'>
                        {userMessage[0]?.profile !== null
                            ? (
                                <img src={userMessage[0]?.profile} alt="profile" className='w-full h-full object-cover object-center' />
                            )
                            : (
                                <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                            )
                        }
                    </figure>

                    <figcaption className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{userMessage[0]?.username}</figcaption>
                </div>
                <Button onClick={() => dispatch(setRightOutletBox('chatpage'))} className={`bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                    <ChevronLeft className='size-7' />
                </Button>
            </div>

            <div className='border rounded-full w-full flex items-center p-1'>
                <Input className='outline-none border-0 shadow-none ring-0!' placeholder='Say hi'/>
                <Button className='rounded-full'>
                    <SendHorizonal />
                </Button>
            </div>

        </div>
    )
}

export default UserChats