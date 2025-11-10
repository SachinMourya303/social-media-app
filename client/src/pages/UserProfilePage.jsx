import UserPosts from '@/app/components/Feeds/utils/UserPosts';
import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper'
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage = () => {
    const users = useSelector(state => state.users.usersData);

    const { userDetails, darkmode } = useSelector(state => state.userAuth);

    const posts = useSelector((state) => state.users.Posts);
    const followers = useSelector((state) => state.users.followers);    
    const following = useSelector((state) => state.users.following);


    const userCredentails = [
        { credential: posts?.length, credentialName: 'Posts' },
        { credential: followers.length, credentialName: 'Followers' },
        { credential: following.length, credentialName: 'Following' },
    ]

    const navigate = useNavigate();

    const renderButton = () => {
        if (userDetails?.users?._id === userId) {
            return <div className='flex items-center justify-evenly w-full'>
                <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Edit Profile</Button>
                <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Share Profile</Button>
            </div>;
        } else if (userDetails?.users?.following?.includes(userId)) {
            return <div className='flex items-center justify-evenly w-full'>
                <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Following</Button>
                <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Message</Button>
            </div>;
        } else {
            return <div className='flex items-center justify-evenly w-full'>
                <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Follow</Button>
                <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Something</Button>
            </div>;
        }
    };

    const { userId } = useParams();

    const findUser = users.find((user) => user._id === userId);
    return (
        <div className='mt-5'>
            <FeedsCardWrapper >
                <ChevronLeft onClick={() => navigate('/')} className={`cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}/>
                <div className='w-full flex flex-col items-center'>
                    <div className='flex justify-evenly items-center w-full'>
                        <figure className='w-30 h-30 md:w-50 md:h-50 rounded-full overflow-hidden'>
                            {findUser?.profile !== null
                                ? <img src={findUser?.profile} alt="story" className='w-full h-full object-cover object-center' />
                                : <img src={websiteLogo.dummyUserIcon} alt="" />
                            }
                        </figure>
                        <div className='flex flex-col gap-3'>
                            <figcaption className={`font-bold text-xl ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{findUser?.username.toUpperCase()}</figcaption>

                            <div className='flex justify-between w-full gap-3'>
                                {userCredentails.map((credentials, index) => (
                                    <div key={index} className='flex flex-col items-center justify-center w-full'>
                                        <span className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{credentials.credential}</span>
                                        <span className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{credentials.credentialName}</span>
                                    </div>
                                ))}
                            </div>

                            <figcaption className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>{findUser?.bio}</figcaption>
                        </div>
                    </div>

                    <div className="mt-5 w-full">{renderButton()}</div>

                    <UserPosts />
                </div>
            </FeedsCardWrapper>
        </div>
    )
}

export default UserProfilePage