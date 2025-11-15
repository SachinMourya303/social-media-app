import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper'
import { setPreviewPostBox } from '@/app/stateManagement/slice/popupSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { sendDeletePostRequest } from '@/utils/deletePost';
import { sendLikesRequest } from '@/utils/likeService';
import { EllipsisVertical, Heart, MessageSquare, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Posts = () => {
    const { darkmode } = useSelector(state => state.userAuth);
    const loggedUser = useSelector(state => state.users.loggedUser);
    const posts = useSelector(state => state.users.posts);
    const followButtonLoading = useSelector(state => state.users.followButtonLoading);
    const dispatch = useDispatch();
    const [deleteBtn, setDeleteBtn] = useState(false);

    const postsArray = posts?.posts || [];

    const filteredPosts = postsArray.filter(post => {
        return loggedUser?.followers?.some(follower =>
            follower.userId === post.userId && follower.connection === true
        );
    });

    const finalPosts = [
        ...filteredPosts,
        ...postsArray.filter(post => post.userId === loggedUser?._id)
    ];

    const userId = loggedUser?._id;
    const profile = loggedUser?.profile;
    const username = loggedUser?.username;
    const likesService = async (postId) => {
        await sendLikesRequest(dispatch, postId, userId, profile, username);
    }

    const deletePost = async (postId) => {
        await sendDeletePostRequest(dispatch, postId);
    }

    return (
        <div className='mt-5 md:mr-5'>
            {finalPosts.length > 0 ? (
                finalPosts.toReversed().map((post) => (
                    <div key={post._id} className='mt-5'>
                        <FeedsCardWrapper>
                            <div className='flex flex-col'>
                                <div className='flex justify-between w-full'>
                                    <div className='flex gap-2'>
                                        <figure className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'>
                                            {post?.profile !== "null" || null
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
                                                <span className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                                                    {post?.username}
                                                </span>
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

                                    {loggedUser?._id === post?.userId &&
                                        <div className='relative cursor-pointer'>
                                            <EllipsisVertical onClick={() => setDeleteBtn(true)} className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`} />
                                            <div>
                                                {deleteBtn &&
                                                    <div className={`absolute flex top-6 right-0 rounded-tr ${darkmode ? 'bg-darkmode-theme' : 'bg-white'} shadow-[0px_0px_5px_1px_lightgray] rounded-lg overflow-hidden`}>
                                                        <Button onClick={() => deletePost(post?._id)} className={`bg-transparent ${darkmode ? 'text-darkmode-text hover:bg-darkmode-element' : 'text-gray-700 hover:bg-gray-100'} rounded-none cursor-pointer`}>
                                                            <span className='text-red-500'>{followButtonLoading ? <Spinner /> : 'Delete'}</span>
                                                        </Button>
                                                        <Button onClick={() => setDeleteBtn(false)} className={`bg-transparent hover:bg-transparent cursor-pointer  ${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                                                            <X />
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div className='mt-5'>
                                    <figure>
                                        <img src={post?.url} alt="post" className='w-full h-full object-cover object-center' />
                                    </figure>
                                    <hr className={`w-full mt-5 border-[1.5px] border-t ${darkmode ? 'border-darkmode-text/20' : 'border-gray-200'}`} />
                                    <div className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{post?.caption}</div>
                                    <figcaption className='w-full flex items-center gap-3'>
                                        <Button onClick={() => likesService(post._id)} className='bg-transparent p-0! m-0! text-gray-500 hover:text-red-500 cursor-pointer hover:bg-transparent'>
                                            <Heart className='size-5' />
                                            <span>{followButtonLoading ? <Spinner /> : post?.likes.length}</span>
                                        </Button>

                                        <Button onClick={() => dispatch(setPreviewPostBox(post?._id))} className='bg-transparent p-0! m-0! text-gray-500 hover:text-red-500 cursor-pointer hover:bg-transparent'>
                                            <MessageSquare className='size-5' />
                                        </Button>
                                    </figcaption>
                                </div>
                            </div>
                        </FeedsCardWrapper>
                    </div>
                ))
            ) : (
                <p className={`${darkmode ? 'text-darkmode-text/70' : 'text-gray-500'}`}>No posts available</p>
            )}
        </div>
    );
}

export default Posts;
