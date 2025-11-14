import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const PreviewPosts = () => {
    const posts = useSelector(state => state.users.posts);
    const loggedUser = useSelector(state => state.users.loggedUser);

    const previewPostBox = useSelector(state => state.popup.previewPostBox);

    const postId = previewPostBox;

    const findPost = posts.posts.find((user) => user._id === postId);

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

                    <div>
                        <ScrollArea >
                            No comments
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewPosts