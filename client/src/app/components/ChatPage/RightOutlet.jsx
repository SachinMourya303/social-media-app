import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper'
import Chatpage from '@/pages/Chatpage'
import NotificationPage from '@/pages/NotificationPage'
import React from 'react'
import { useSelector } from 'react-redux'

const RightOutlet = () => {
  const rightOutletBox = useSelector(state => state.popup.rightOutletBox);
  
  return (
    <div className='mr-5 mt-5'>
      {rightOutletBox === 'chatpage' ?
       <FeedsCardWrapper >
        <Chatpage />
       </FeedsCardWrapper> 
       : '' }
      {rightOutletBox === 'notification' ? 
      <FeedsCardWrapper >
        <NotificationPage />
      </FeedsCardWrapper>
      : '' }
    </div>
  )
}

export default RightOutlet