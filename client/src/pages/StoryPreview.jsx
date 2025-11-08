import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const StoryPreview = () => {
  const users = useSelector(state => state.users.usersData);
  
  const navigate = useNavigate();

  const { storyId } = useParams();

   useEffect(() => {
  const hasReloaded = sessionStorage.getItem('hasReloaded');
  if (!hasReloaded) {
    sessionStorage.setItem('hasReloaded', 'true');
    window.location.reload();
  } else {
    sessionStorage.removeItem('hasReloaded');
  }
}, []);


  const findUser = users.find((user) => user._id === storyId);
  console.log(findUser);
  
  

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/');
  //   }, 15000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className=' w-full flex justify-center items-center h-screen bg-black'>
      <div className='relative h-full w-full flex justify-center items-start pt-40 md:pt-0 md:items-center'>
        {findUser?.storyFile?.type !== 'video'
        ? <img src={findUser?.storyFile?.url} alt="story" className='object-cover object-center' />
        : <video src={findUser?.storyFile?.url} alt='story' autoPlay muted playsInline loop className='w-full h-full object-cover object-center' />
      }

      <div className='absolute top-5 left-0 md:top-10 md:left-10'>
        <Button onClick={() => navigate('/')} className='bg-transparent hover:bg-transparent rounded-full  p-0 w-10 h-10 md:h-20 md:w-20 cursor-pointer'>
          <ChevronLeft className='size-10' />
        </Button>
      </div>
      </div>
    </div>
  )
}

export default StoryPreview