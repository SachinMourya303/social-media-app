import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import { ChevronLeft, Trash } from 'lucide-react';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const StoryPreview = () => {
  const users = useSelector(state => state.users.usersData);

  const navigate = useNavigate();

  const { storyId } = useParams();

  const findUser = users.find((user) => user._id === storyId);
  console.log(findUser);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 15000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const deleteStory = async (id) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URI}/users/delete/story/${id}`);
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  }

  return (
    <div className=' w-full flex justify-center items-center h-screen bg-black'>
      <div className='w-[50%] md:h-full w-full flex justify-center items-start md:pt-0 md:items-center overflow-hidden'>
        {findUser?.storyFile?.type !== 'video'
          ? <div className='relative flex justify-center items-center'>
            <img src={findUser?.storyFile?.url} alt="story" className='object-cover object-center' />
            <span className='absolute w-full flex flex-col justify-center items-center z-10 bottom-5 md:bottom-80 text-white capitalize text-xl md:text-2xl'>
              <p className='w-full py-2 bg-white/30 text-black/90 text-center'>{findUser?.storyFile?.caption}</p>
            </span>
          </div>
          : <video src={findUser?.storyFile?.url} alt='story' autoPlay muted playsInline loop className='w-full h-full object-cover object-center' />
        }

        <div className='absolute flex items-center w-full justify-between top-5 left-0 md:top-10 px-10'>
          <Button onClick={() => navigate('/')} className='bg-transparent hover:bg-transparent md:bg-app-theme md:hover:bg-app-theme/50 rounded-full  p-0 w-10 h-10 md:h-20 md:w-20 cursor-pointer'>
            <ChevronLeft className='size-10' />
          </Button>
          <div onClick={() => deleteStory(findUser?._id)} className='bg-red-500/50 hover:bg-red-500/80 text-white cursor-pointer p-3 rounded-full'><Trash /></div>
        </div>
      </div>
    </div>
  )
}

export default StoryPreview