import { Button } from '@/components/ui/button';
import React from 'react'
import { useSelector } from 'react-redux';

const NotificationPage = () => {
    const followers = useSelector(state => state.users.followers);
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    console.log(followers);

    return (
        <div className='w-full'>
            <div className='mb-2'>
                <strong className={`${darkmode ? 'text-darkmode-text hover:bg-darkmode-element' : 'text-gray-700 hover:bg-gray-100'}`}>Notification</strong>
                <hr className='mt-2' />
            </div>

            <div>
                {/* {followers.filter((follow) => follow?.followers?.email === userDetails?.users?.email).map((tofollow) => (
                    <div key={tofollow._id}>{tofollow.username}</div>
                ))} */}

                {followers.map((tofollow) => (
                    <div key={tofollow._id}>
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
                                <Button className='px-1 cursor-pointer'>Confirm</Button>
                                <Button className={`bg-transparent hover:bg-transparent cursor-pointer  ${darkmode ? 'text-darkmode-text hover:bg-darkmode-element' : 'text-gray-700 hover:bg-gray-100'} px-1`}>Delete</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotificationPage