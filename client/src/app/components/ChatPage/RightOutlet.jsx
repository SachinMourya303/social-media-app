import Chatpage from '@/pages/Chatpage'
import NotificationPage from '@/pages/NotificationPage'
import React from 'react'
import { useSelector } from 'react-redux'

const RightOutlet = () => {
  const rightOutletBox = useSelector(state => state.popup.rightOutletBox);
  console.log(rightOutletBox);
  
  return (
    <div className=''>
      {rightOutletBox === 'chatpage' ? <Chatpage /> : '' }
      {rightOutletBox === 'notification' ? <NotificationPage /> : '' }
    </div>
  )
}

export default RightOutlet