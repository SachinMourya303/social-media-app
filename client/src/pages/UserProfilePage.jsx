import UserPosts from '@/app/components/Feeds/utils/UserPosts';
import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper'
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage = () => {
    const users = useSelector(state => state.users.usersData);
    const navigate = useNavigate();
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    const posts = useSelector((state) => state.users.posts);
    const followers = useSelector((state) => state.users.followers);
    const following = useSelector((state) => state.users.following);
    const loggedUser = useSelector(state => state.users.loggedUser);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const filterUserPosts = posts?.posts?.filter((user) => user?.userId === loggedUser?._id);
        setUserPosts(filterUserPosts)
    }, [posts]);

    const userCredentails = [
        { credential: userPosts?.length, credentialName: 'Post' },
        { credential: followers.length, credentialName: 'Followers' },
        { credential: following.length, credentialName: 'Following' },
    ]
    // const renderButton = () => {
    //     if (userDetails?.users?._id === userId) {
    //         return <div className='flex items-center justify-evenly w-full'>
    //             <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Edit Profile</Button>
    //             <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Share Profile</Button>
    //         </div>;
    //     } else if (followers.filter((user) => user?.followers?.some(f => f.userId === loggedUser._id && f.connection === true))) {
    //         return <div className='flex items-center justify-evenly w-full'>
    //             <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Following</Button>
    //             <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Message</Button>
    //         </div>;
    //     } else {
    //         return <div className='flex items-center justify-evenly w-full'>
    //             <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Follow</Button>
    //             <Button className={`border bg-transparent hover:bg-transparent cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Something</Button>
    //         </div>;
    //     }
    // };

    const { userId } = useParams();

    const findUser = users.find((user) => user._id === userId);

    const isLoading = useSelector(state => state.users.isLoading);

    if (isLoading) return <div className='flex flex-col ml-5 xl:ml-0 md:mt-10 mr-5'>
        <div className="flex mb-3">
            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" className="mb-2"></Skeleton>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div className="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
    </div>

    return (
        <div className='mt-5 md:mr-5'>
            <div className='h-[700px] w-full overflow-y-auto no-scrollbar'>
            <FeedsCardWrapper >
                <div className='w-full flex flex-col items-center'>
                    <div className='flex justify-start w-full ml-[-20px]'>
                        <ChevronLeft onClick={() => navigate('/')} className={`cursor-pointer ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`} />
                    </div>
                    <div className='flex justify-evenly items-center w-full'>
                        <figure className='w-20 h-20 md:w-40 md:h-40 rounded-full overflow-hidden'>
                            {findUser?.profile !== null
                                ? <img src={findUser?.profile} alt="story" className='w-full h-full object-cover object-center' />
                                : <img src={websiteLogo.dummyUserIcon} alt="" />
                            }
                        </figure>
                        <div className='flex justify-start flex-col gap-3'>
                            <figcaption className={`font-bold text-xl capitalize ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{findUser?.username}</figcaption>

                            <div className='flex justify-between w-full gap-3'>
                                {userCredentails.map((credentials, index) => (
                                    <div key={index} className='flex flex-col justify-center w-full'>
                                        <span className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{credentials.credential}</span>
                                        <span className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{credentials.credentialName}</span>
                                    </div>
                                ))}
                            </div>

                            <figcaption className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>{findUser?.bio}</figcaption>
                        </div>
                    </div>

                    {/* <div className="mt-5 w-full">{renderButton()}</div> */}

                    <UserPosts />
                </div>
            </FeedsCardWrapper>
            </div>
        </div>
    )
}

export default UserProfilePage