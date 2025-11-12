import { Input } from '@/components/ui/input';
import { Image, SendHorizonal, Video } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { websiteLogo } from '@/assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';
import { setAddStoryDialogBox, setPostDialogBox } from '../stateManagement/slice/popupSlice';

const PostTab = () => {
    const { userDetails, darkmode } = useSelector(state => state.userAuth);
    const postDialogBox = useSelector(state => state.popup.postDialogBox);
    const [loader, setLoader] = useState(false);
    const [storyFile, setStoryFile] = useState(null);
    const [storyVideo, setStoryVideo] = useState(null);
    const [storyData, setStoryData] = useState({ caption: "" });    
    
    const dispatch = useDispatch();

    const onCaptionChange = (e) => {
        const { name, value } = e.target;
        setStoryData(prev => ({ ...prev, [name]: value }));
    }

    const onStoryFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (!userDetails?.users?._id) return toast.error("No user id found");
        if (!storyFile && !storyVideo) return toast.error("Please select a photo or video first");
        try {
            const formData = new FormData();
            formData.append('file', storyFile || storyVideo);
            formData.append('caption', storyData.caption);
            const response = await axios.put(`${import.meta.env.VITE_API_URI}/users/create/post/${userDetails?.users?._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success(response.data.message || 'Uploded');
            setStoryFile(null);
            setStoryVideo(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload story");
            console.log(error.message);
        }
        finally {
            setLoader(false);
            dispatch(setPostDialogBox(false));
        }
    }

    return postDialogBox && (
        <form onSubmit={onStoryFormSubmit} className='w-full'>
            <div className="flex w-[90%] mt-2 p-2">Create Post</div>
            <hr />
            <figure className={`w-full h-[320px] xl:h-[380px] rounded-lg flex items-center justify-center cursor-pointer`}>
                <input type="file" onChange={(e) => { setStoryFile(e.target.files[0]); setStoryVideo(null); }} id='story-file' hidden accept='image/*' />
                <input type="file" onChange={(e) => { setStoryVideo(e.target.files[0]); setStoryFile(null); }} id='story-video' hidden accept='video/*' />
                {
                    storyFile
                        ? <label className='relative cursor-pointer h-full w-full flex items-center justify-center'>
                            <img src={URL.createObjectURL(storyFile)} alt="story" className='object-cover object-center h-full w-full' />
                            <div className='absolute z-10'>
                                {loader ? <Spinner className='size-20 text-white' /> : ''}
                            </div>
                        </label>
                        : storyVideo
                            ? <label className=' relative cursor-pointer h-full w-full flex items-center justify-center'>
                                <video src={URL.createObjectURL(storyVideo)} alt="story" controls className='object-cover object-center h-full w-full' />
                                <div className='absolute z-10'>
                                    {loader ? <Spinner className='size-20 text-white' /> : ''}
                                </div>
                            </label>
                            : <label className='cursor-pointer h-full w-full flex items-center justify-center'>
                                <img src={darkmode ? websiteLogo.whiteVideoImageIcon : websiteLogo.blackVideoImageIcon} alt="story" className='opacity-20 h-50 p-5 object-cover object-center' />
                            </label>
                }
            </figure>

            <div className='w-full flex items-center justify-between px-2 mt-2'>
                <Input onChange={onCaptionChange} name="caption" value={storyData.caption} className={`w-[85%] md:w-[90%] border-0 rounded-lg flex gap-2 items-center px-2 ring-0! shadow-none ${darkmode ? 'bg-darkmode-element' : 'bg-gray-100'}`} placeholder='Add Caption...' />
                <button type='submit' className='bg-transparent hover:bg-transparent cursor-pointer'>
                    <SendHorizonal className='size-10 p-2 text-blue-500 bg-blue-200 rounded-full' />
                </button>
            </div>

            <div className='flex gap-2 mt-5 w-full px-2'>
                <label htmlFor='story-file' onClick={(e) => setStoryVideo(null)} className='flex items-center justify-center gap-3 w-[50%] bg-blue-400 text-white hover:bg-blue-400/80 cursor-pointer rounded-lg p-2'>
                    <Image />
                    <span>Photo</span>
                </label>
                <label htmlFor='story-video' onClick={(e) => setStoryFile(null)} className='flex items-center justify-center gap-3 w-[50%] bg-red-400 text-white hover:bg-red-400/80 cursor-pointer rounded-lg p-2'>
                    <Video />
                    <span>Video</span>
                </label>
            </div>
        </form>
    )
}

export default PostTab;
