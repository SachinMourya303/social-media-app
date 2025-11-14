import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import { sendCommentRequest } from '@/utils/commentService';
import { SendHorizonal } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PreviewPosts = () => {
    const posts = useSelector(state => state.users.posts);
    const loggedUser = useSelector(state => state.users.loggedUser);
    const { darkmode } = useSelector(state => state.userAuth);
    const followButtonLoading = useSelector(state => state.users.followButtonLoading);
    const previewPostBox = useSelector(state => state.popup.previewPostBox);
    const dispatch = useDispatch();
    const postId = previewPostBox;

    const findPost = posts.posts.find((user) => user._id === postId);

    const [comment, setComment] = useState("");

    const userId = loggedUser._id;
    const profile = loggedUser.profile;
    const username = loggedUser.username;
    const commentService = async () => {
        await sendCommentRequest(dispatch, setComment, postId, userId, profile, username, comment);
    }

    return previewPostBox && (
        <div >
            <div className='flex-col md:flex md:flex-row'>
                <figure className='w-full md:w-[60%] h-full'>
                    <img src={findPost?.url} alt="post" className='w-full h-full object-cover object-center' />
                </figure>

                <div className='flex flex-col w-full md:w-[40%]'>
                    <div className='w-full'>
                        <strong className="flex w-[90%] mt-2 p-2">Comments</strong>
                        <hr />
                    </div>

                    <div className='flex flex-col h-full justify-between'>
                        {findPost?.comments ? 
                        <ScrollArea >
                            {findPost?.comments.map((com) => (
                                <div key={com._id} className='flex gap-1 items-center'>
                                    <figure className='flex w-10 h-10 rounded-full overflow-hidden m-2'>
                                        <img src={com?.profile} alt="" className='h-full w-full object-cover object-center' />
                                    </figure>
                                    <figcaption className='flex gap-2 items-start'>
                                        <div className='flex flex-col'>
                                            <span className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                                                {com?.username}
                                            </span>
                                            <span className={`text-xs ${darkmode ? 'text-darkmode-text/80' : 'text-gray-500'}`}>
                                                {new Date(com?.createdAt).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <span className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>
                                            {com?.comment}
                                        </span>
                                    </figcaption>
                                </div>
                            ))}
                        </ScrollArea>
                        : <span className='flex w-full justify-center mt-5'>No comments yet</span>}

                        <div className='flex border m-2 p-1 rounded-full'>
                            <Input onChange={(e) => setComment(e.target.value)} name="comment" value={comment} className="border-0 outline-none ring-0! shadow-none" placeholder="Search friends" />
                            <Button onClick={commentService} className='rounded-full'>
                                {followButtonLoading ? <Spinner /> : <SendHorizonal />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewPosts