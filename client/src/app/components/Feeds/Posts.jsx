import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper'
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Heart, MessageSquare } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';

const Posts = () => {

    const { darkmode } = useSelector(state => state.userAuth);
    const loggedUser = useSelector(state => state.users.loggedUser);
    const posts = useSelector(state => state.users.posts);
    const postsArray = posts?.posts || [];


    return (
        <div className='mt-5 md:mr-5'>
            <FeedsCardWrapper >
                {postsArray.length > 0 ? (
                    postsArray.map((post) => (
                        <div className='w-full' key={post._id}>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex gap-2 items-center w-full'>
                                    <figure className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'>
                                        {post?.profile !== null
                                            ? (
                                                <img src={post?.profile} alt="profile" className='w-full h-full object-cover object-center' />
                                            )
                                            : (
                                                <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                                            )
                                        }
                                    </figure>

                                    <figcaption className='flex items-center'>
                                        <div className='flex flex-col'>
                                            <span className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{post?.username}</span>
                                            <span className={`text-xs ${darkmode ? 'text-darkmode-text/80' : 'text-gray-500'}`}>
                                                {new Date(post?.createdAt).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </span>
                                        </div>
                                    </figcaption>
                                </div>
                                <div className='relative cursor-pointer group'>
                                    <EllipsisVertical className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`} />
                                    <div>
                                        <div className={`absolute hidden group-hover:flex flex-col top-6 right-0 rounded-tr ${darkmode ? 'bg-darkmode-theme' : 'bg-white'} shadow-[0px_0px_5px_1px_lightgray] rounded-lg overflow-hidden`}>
                                            <Button className={`bg-transparent ${darkmode ? 'text-darkmode-text hover:bg-darkmode-element' : 'text-gray-700 hover:bg-gray-100'} rounded-none cursor-pointer`}>Delete</Button>
                                            <hr className='border-t border-gray-300' />
                                            <Button className={`bg-transparent ${darkmode ? 'text-darkmode-text hover:bg-darkmode-element' : 'text-gray-700 hover:bg-gray-100'} rounded-none cursor-pointer`}>Hide</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <figure className='w-full h-full cursor-pointer'>
                                    <img src={post?.url} alt="profile" className='w-full h-full object-cover object-center' />
                                </figure>
                                <hr className={`w-full mt-5 border-[1.5px] border-t ${darkmode ? 'border-darkmode-text/20' : 'border-gray-200'}`} />
                                <figcaption className='mt-2 w-full flex items-center gap-3'>
                                    <Button className='bg-transparent p-0! m-0! text-gray-300 hover:text-red-500 cursor-pointer hover:bg-transparent'>
                                        <Heart className='size-5' />100
                                    </Button>

                                    <Button className='bg-transparent p-0! m-0! text-gray-300 hover:text-red-500 cursor-pointer hover:bg-transparent'>
                                        <MessageSquare className='size-5' />100
                                    </Button>
                                </figcaption>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>No posts available</p>
                )}
            </FeedsCardWrapper>
        </div>
    )
}

export default Posts