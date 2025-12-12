import { setActivePage } from '@/app/stateManagement/slice/popupSlice';
import { setNotification } from '@/app/stateManagement/slice/usersSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { acceptFollowRequest } from '@/utils/followBackService';
import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const NotificationPage = () => {
    const loggedUser = useSelector(state => state.users.loggedUser);
    const notification = useSelector(state => state.users.notification);    
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    const followButtonLoading = useSelector(state => state.users.followButtonLoading);
    const dispatch = useDispatch();

    const followBackService = async (receiver_Id) => {
        await acceptFollowRequest(dispatch, loggedUser?._id, receiver_Id);

        const updated = notification.filter(user => user?._id !== receiver_Id);

        dispatch(setNotification(updated));
    };

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between w-full'>
                <strong className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>Notification</strong>
                <Button onClick={() => dispatch(setActivePage(''))} className={`bg-transparent flex md:hidden hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                    <ChevronLeft className='size-7' />
                </Button>
            </div>
            <hr className={`mt-3 ${darkmode ? 'border-t border-darkmode-text/50' : 'border-t border-gray-200'}`} />
            {
                notification.length > 0 ? (
                    <div>
                        {notification?.map((tofollow) => (
                            <div key={tofollow._id} className='my-3'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <figure className={'w-10 h-10 rounded-full overflow-hidden'}>
                                            {tofollow?.profile !== null
                                                ? (
                                                    <img src={tofollow?.profile} alt="profile" className='w-full h-full object-cover object-center' />
                                                )
                                                : (
                                                    <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                                                )
                                            }
                                        </figure>
                                        <figcaption className={` cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                                            <span>{tofollow?.username}</span>
                                            <p className='text-xs'>Requested to follow you</p>
                                        </figcaption>
                                    </div>

                                    <div className='flex gap-1 justify-center items-center'>
                                        <Button onClick={() => followBackService(tofollow._id)} className='px-1 cursor-pointer'>{followButtonLoading ? <Spinner /> : 'Confirm'}</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <div className={`mt-5 text-center ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>No notification!</div>
            }
        </div>
    )
}

export default NotificationPage