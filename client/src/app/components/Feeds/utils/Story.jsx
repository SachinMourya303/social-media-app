import StoryTab from '@/app/popups/StoryTab';
import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper';
import { websiteLogo } from '@/assets/assets';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react'
import { useSelector } from 'react-redux';

const Story = () => {
  const users = useSelector(state => state.users.usersData);
  const { userToken, userDetails, darkmode } = useSelector(state => state.userAuth);

  return (
    <div className='ml-5 xl:ml-0 mt-5 mr-5'>
      <FeedsCardWrapper>
        <ScrollArea className='w-full'>
          <div className='flex items-center gap-2 w-[700px]'>

            <div className='flex flex-col items-center justify-center gap-2'>
              <figure className='w-15 h-15 rounded-full overflow-hidden'>
                {userDetails?.users.profile !== null
                  ? (
                    <img src={userDetails?.users.profile} alt="profile" className='w-full h-full object-cover object-center' />
                  )
                  : (
                    <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                  )
                }
              </figure>
              <figcaption className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>Your Story</figcaption>
            </div>

            <div className='flex items-center justify-center gap-2'>
              {users.filter((user) => user.email !== userToken.users.email).map((user, index) => (
                <div key={index} className='flex flex-col justify-center gap-2'>

                  <figure className='w-15 h-15 rounded-full overflow-hidden cursor-pointer'>
                    {user?.profile !== null
                      ? (
                        <img src={user.profile} alt="profile" className='w-full h-full object-cover object-center' />
                      )
                      : (
                        <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
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

      <div>
        <StoryTab />
      </div>
    </div>
  )
}

export default Story