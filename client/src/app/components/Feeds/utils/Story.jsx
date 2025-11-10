import StoryTab from '@/app/popups/StoryTab';
import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper';
import { setAddStoryDialogBox, setSearchDialogBox } from '@/app/stateManagement/slice/popupSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Story = () => {
  const followers = useSelector(state => state.users.followers);
  // console.log(followers);
  

  const { userToken, userDetails, darkmode } = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users.usersData);
  

  const storyPreview = () => {
    const findUser = users.find((user) => user._id === userDetails?.users._id);
    
    if (findUser?.storyFile?.url !== null) {
      navigate(`/stories/${userDetails?.users._id}`)
    } else {
      toast('No story added!');
      dispatch(setAddStoryDialogBox());
    }
  }
  return (
    <div>
      <div className='relative ml-0 mt-5 md:mr-5'>
        <FeedsCardWrapper>
          <ScrollArea className='w-full'>
            <div className='flex items-center gap-2 w-[700px]'>

              <div className='group'>
                <div className='relative flex flex-col items-center justify-center gap-2'>
                  <figure className={`w-15 h-15 rounded-full overflow-hidden cursor-pointer  ${userDetails?.users.storyFile.url !== null ? 'border-4 border-app-theme/50' : ''}`}>
                    {userDetails?.users.profile !== null
                      ? (
                        <img src={userDetails?.users.profile} alt="profile" className='w-full h-full object-cover object-center' />
                      )
                      : (
                        <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                      )
                    }
                  </figure>
                  <figcaption className={`absolute bottom-5 right-0 bg-black/60 rounded-full text-app-theme cursor-pointer ${userDetails?.users.storyFile.url !== null ? 'hidden' : 'flex'}`}><PlusCircle /></figcaption>
                  <figcaption className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Your Story</figcaption>
                </div>

                <div className={`absolute hidden group-hover:flex flex-col top-20 left-0 rounded-tl ${darkmode ? 'bg-darkmode-theme' : 'bg-white'} shadow-[0px_0px_5px_1px_lightgray] rounded-lg overflow-hidden`}>
                  <Button onClick={storyPreview} className={`bg-transparent ${darkmode ? 'darkmode-text hover:bg-darkmode-element' : 'text-gray-700 hover:bg-gray-100'} rounded-none cursor-pointer`}>View Story</Button>
                  <hr className='border-t border-gray-300' />
                  <Button onClick={() => {dispatch(setAddStoryDialogBox(true)); dispatch(setSearchDialogBox(false))}} className={`bg-transparent ${darkmode ? 'darkmode-text hover:bg-darkmode-element' : 'text-gray-700 hover:bg-gray-100'} rounded-none cursor-pointer`}>Add Story</Button>
                </div>
              </div>

              <div className='flex items-center justify-center gap-2'>
                {followers.map((user, index) => (
                  <div onClick={() => navigate(`/stories/${user?._id}`)} key={index} className='flex flex-col w-15 items-center justify-center gap-2'>

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
                      {user.username.slice(0 , 7)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <ScrollBar orientation="horizontal" className='invisible md:visible cursor-pointer' />
          </ScrollArea>
        </FeedsCardWrapper>
      </div>
    </div>
  )
}

export default Story