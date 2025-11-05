import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const StoryPage = () => {
  const users = useSelector(state => state.users.usersData);
  const navigate = useNavigate();

  const { storyId } = useParams();

  const findUser = users.find((user) => user._id === storyId);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 15000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className=' w-full flex justify-center items-center h-screen'>
      <div className='relative'>
        {findUser?.storyFile?.type !== 'video'
        ? <img src={findUser?.storyFile?.url} alt="story" className='w-full h-full' />
        : <video src={findUser?.storyFile?.url} alt='story' autoPlay muted playsInline loop className='w-full h-full' />
      }

      <div className='absolute top-5 left-5 md:top-10 md:left-10'>
        <Button onClick={() => navigate('/')} className='bg-app-theme hover:bg-app-theme/80 rounded-full p-5 w-10 h-10 md:h-20 md:w-20 cursor-pointer'>
          <ChevronLeft className='size-10' />
        </Button>
      </div>
      </div>
    </div>
  )
}

export default StoryPage