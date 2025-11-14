import CardWrapper from '@/app/ReusableComponents/CardWrapper';
import { setMessageId, setRightOutletBox } from '@/app/stateManagement/slice/popupSlice';
import { setFollowing } from '@/app/stateManagement/slice/usersSlice';
import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { userDetails, darkmode } = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.users.followers);

  return (
    <div className='w-full'>
      <strong className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>Messages</strong>
      <hr className={`mt-3 ${darkmode ? 'border-t border-darkmode-text/50' : 'border-t border-gray-200'}`} />
      <ScrollArea className='h-80 w-full cursor-pointer'>
        <div className='flex flex-col items-start justify-start w-full'>
          {followers.map((user, index) => (
            <div onClick={() => {dispatch(setRightOutletBox('message')); dispatch(setMessageId(user._id))}} key={index} className={`flex items-center gap-5 mt-3 ${darkmode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} w-full p-1 rounded-lg`}>
              <figure className='w-12 h-12 rounded-full overflow-hidden'>
                {user?.profile !== null
                  ? (
                    <img src={user.profile} alt="profile" className='w-full h-full object-cover object-center' />
                  )
                  : (
                    <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
                  )
                }
              </figure>

              <strong className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>
                {user.username}
              </strong>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChatPage