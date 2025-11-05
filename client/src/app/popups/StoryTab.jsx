import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleFadingPlus, Image, SendHorizonal, Video, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStoryDialogBox } from '../stateManagement/slice/popupSlice';
import { websiteLogo } from '@/assets/assets';

const StoryTab = () => {
    const { userToken, userDetails, darkmode } = useSelector(state => state.userAuth);
    const storyDialogBox = useSelector(state => state.popup.storyDialogBox);
    const dispatch = useDispatch();
    const [storyFile, setStoryFile] = useState();
    const [storyVideo, setStoryVideo] = useState();

    return (
        <div className='flex justify-center w-full transition-all'>
            <div className={`flex flex-col items-center w-full md:w-[50%] shadow-lg rounded-md p-5 ${darkmode ? 'bg-darkmode-theme' : 'bg-white'}`}>
                <div className={`flex justify-between w-full ${darkmode ? 'text-darkmode-text truncate text-center' : 'text-gray-500 truncate text-center'} `}>
                    <strong>Add Story</strong>
                    <X onClick={() => dispatch(setStoryDialogBox())} className='cursor-pointer'/>
                </div>
                <figure className={`mt-5 w-full rounded-lg flex justify-center cursor-pointer`}>
                    <input type="file" onChange={(e) => setStoryFile(e.target.files[0])} id='story-file' hidden accept='image/*' />
                    <input type="file" onChange={(e) => setStoryVideo(e.target.files[0])} id='story-video' hidden accept='video/*' />
                    {
                        storyFile
                            ? <label className='cursor-pointer'>
                                {
                                    storyFile
                                        ? <img src={URL.createObjectURL(storyFile)} alt="story" />
                                        : <img src={darkmode ? websiteLogo.whiteVideoImageIcon : websiteLogo.blackVideoImageIcon} alt="story" className='opacity-20 h-50 p-5'/>
                                }
                            </label>

                            : <label className='cursor-pointer'>
                                {
                                    storyVideo
                                        ? <video src={URL.createObjectURL(storyVideo)} alt="story" controls />
                                        : <img src={darkmode ? websiteLogo.whiteVideoImageIcon : websiteLogo.blackVideoImageIcon} alt="story" className='opacity-20 h-50 p-5'/>

                                }
                            </label>
                    }
                </figure>

                <div className='w-full flex items-center justify-between mt-5'>
                    <Input className={`w-[85%] border-0 rounded-lg flex gap-2 items-center px-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${darkmode ? 'bg-darkmode-element' : 'bg-gray-100'}`} placeholder='Add Caption...' />
                    <span>
                        <SendHorizonal className='size-10 p-2 text-blue-500 bg-blue-200 rounded-full cursor-pointer' />
                    </span>
                </div>

                <div className='flex gap-2 mt-5 w-full'>
                    <label htmlFor='story-file' onClick={(e) => setStoryVideo()} className='flex items-center justify-center gap-3 w-[50%] bg-blue-400 text-white hover:bg-blue-400/80 cursor-pointer rounded-lg p-2'>
                        <Image />
                        <span>Photo</span>
                    </label>
                    <label htmlFor='story-video' onClick={(e) => setStoryVideo()} className='flex items-center justify-center gap-3 w-[50%] bg-red-400 text-white hover:bg-red-400/80 cursor-pointer rounded-lg p-2'>
                        <Video />
                        <span>Video</span>
                    </label>
                </div>

            </div>
        </div>
    )
}

export default StoryTab