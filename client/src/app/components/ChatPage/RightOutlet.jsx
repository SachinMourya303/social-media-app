import FeedsCardWrapper from '@/app/ReusableComponents/FeedsCardWrapper'
import { setNotification } from '@/app/stateManagement/slice/usersSlice'
import Chatpage from '@/pages/Chatpage'
import NotificationPage from '@/pages/NotificationPage'
import { Skeleton } from 'primereact/skeleton'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const RightOutlet = () => {
  const rightOutletBox = useSelector(state => state.popup.rightOutletBox);
  const isLoading = useSelector(state => state.users.isLoading);
  const followers = useSelector(state => state.users.followers);
  const loggedUser = useSelector(state => state.users.loggedUser);
  const dispatch = useDispatch();

   useEffect(() => {
    const filterFollowers = followers.filter((user) => !user?.followers?.some(f => f.userId === loggedUser._id && f.connection === true));    
    dispatch(setNotification(filterFollowers));
  }, [followers]);

  if (isLoading) return <div className="gap-5 m-5">
    <ul className="m-0 p-0 list-none">
      <li className='mb-3 w-full'>
        <Skeleton className='h-15! w-full'></Skeleton>
      </li>
      <li className="mb-3">
        <div className="flex">
          <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
          <div style={{ flex: '1' }}>
            <Skeleton width="100%" className="mb-2"></Skeleton>
            <Skeleton width="75%"></Skeleton>
          </div>
        </div>
      </li>
      <li className="mb-3">
        <div className="flex">
          <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
          <div style={{ flex: '1' }}>
            <Skeleton width="100%" className="mb-2"></Skeleton>
            <Skeleton width="75%"></Skeleton>
          </div>
        </div>
      </li>
      <li className="mb-3">
        <div className="flex">
          <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
          <div style={{ flex: '1' }}>
            <Skeleton width="100%" className="mb-2"></Skeleton>
            <Skeleton width="75%"></Skeleton>
          </div>
        </div>
      </li>
      <li>
        <div className="flex">
          <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
          <div style={{ flex: '1' }}>
            <Skeleton width="100%" className="mb-2"></Skeleton>
            <Skeleton width="75%"></Skeleton>
          </div>
        </div>
      </li>
    </ul>
  </div>

  return (
    <div className='mr-5 mt-5'>
      {rightOutletBox === 'chatpage' ?
        <FeedsCardWrapper >
          <Chatpage />
        </FeedsCardWrapper>
        : ''}
      {rightOutletBox === 'notification' ?
        <FeedsCardWrapper >
          <NotificationPage />
        </FeedsCardWrapper>
        : ''}
    </div>
  )
}

export default RightOutlet