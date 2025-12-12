import CardWrapper from '@/app/ReusableComponents/CardWrapper';
import { setFollowing } from '@/app/stateManagement/slice/usersSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Shortcuts = () => {
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    const loggedUser = useSelector(state => state.users.loggedUser);
    const navigate = useNavigate();
    const followers = useSelector((state) => state.users.followers);
    return (
        <CardWrapper >
            <div>
                <strong className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>Your Shortcuts</strong>
                <hr className={`mt-3 ${darkmode ? 'border-t border-darkmode-text/50' : 'border-t border-gray-200'}`} />
                <ScrollArea className='h-60 w-full cursor-pointer'>
                    <div className='flex flex-col items-start justify-start w-full'>
                        {followers.filter((user) => user?.followers?.some(f => f?.userId === loggedUser?._id && f?.connection === true)).map((user, index) => (
                            <div onClick={() => navigate(`/user/profile/${user?._id}`)} key={index} className={`flex items-center gap-5 mt-3 ${darkmode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} w-full rounded-lg`}>

                                <figure className='w-12 h-12 rounded-full overflow-hidden'>
                                    {user?.profile !== null
                                        ? (
                                            <img src={user.profile} alt="profile" className='w-full h-full object-cover object-center' />
                                        )
                                        : (
                                            <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                                        )
                                    }
                                </figure>

                                <strong className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>
                                    {user.username}
                                </strong>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </CardWrapper>
    )
}

export default Shortcuts