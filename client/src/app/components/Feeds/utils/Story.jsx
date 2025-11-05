import StoryTab from '@/app/popups/StoryTab';
import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper';
import { setStoryDialogBox } from '@/app/stateManagement/slice/popupSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Story = () => {
  const followers = useSelector(state => state.users.following);
  
  const { userToken, userDetails, darkmode } = useSelector(state => state.userAuth);
  
  const storyDialogBox = useSelector(state => state.popup.storyDialogBox);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div className='relative ml-5 xl:ml-0 mt-5 mr-5'>
        <FeedsCardWrapper>
          <ScrollArea className='w-full'>
            <div className='flex items-center gap-2 w-[700px]'>

              <div className='group'>
                <div className='relative flex flex-col items-center justify-center gap-2'>
                <figure className='w-15 h-15 rounded-full overflow-hidden cursor-pointer'>
                  {userDetails?.users.profile !== null
                    ? (
                      <img src={userDetails?.users.profile} alt="profile" className='w-full h-full object-cover object-center' />
                    )
                    : (
                      <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                    )
                  }
                </figure>
                <figcaption className='absolute bottom-5 right-0 bg-black/60 rounded-full text-app-theme cursor-pointer'><PlusCircle /></figcaption>
                <figcaption className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Your Story</figcaption>
              </div>

                <div className='absolute hidden group-hover:flex flex-col top-20 left-0 rounded-tl backdrop-blur shadow-[0px_0px_5px_1px_gray] rounded-lg overflow-hidden'>
                  <Button onClick={() => navigate(`/stories/${userDetails?.users._id}`)} className='bg-transparent hover:bg-gray-100 text-gray-700 rounded-none cursor-pointer'>View Story</Button>
                  <hr className='border-t border-gray-300' />
                  <Button onClick={() => dispatch(setStoryDialogBox())} className='bg-transparent hover:bg-gray-100 text-gray-700 rounded-none cursor-pointer'>Add Story</Button>
                </div>
              </div>

              <div className='flex items-center justify-center gap-2'>
                {followers.map((user, index) => (
                  <div key={index} className='flex flex-col justify-center gap-2'>

                    <figure className='w-15 h-15 rounded-full overflow-hidden cursor-pointer'>
                      {followers?.storyFile?.url !== null
                        ? (
                          <img src={user.profile} alt="profile" className='w-full h-full object-cover object-center' />
                        )
                        : (
                          ""
                        )
                      }
                    </figure>

                    <span className={`text-xs w-15 ${darkmode ? 'text-darkmode-text truncate text-center' : 'text-gray-500 truncate text-center'}`}>
                      {user.username}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <ScrollBar orientation="horizontal" className='invisible md:visible cursor-pointer' />
          </ScrollArea>
        </FeedsCardWrapper>

        {
          storyDialogBox
            ? <div className='absolute z-1 w-full top-0 left-0 flex justify-center'>
              <div className={`flex pt-5 p-5 w-full ${darkmode ? 'bg-darkmode-theme/50 backdrop-blur' : 'bg-black/10 backdrop-blur'} rounded-lg`}>
                <StoryTab />
              </div>
            </div>
            : ""
        }
      </div>
    </div>
  )
}

export default Story