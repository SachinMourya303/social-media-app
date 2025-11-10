import React, { useEffect } from 'react'
import Profile from './utils/Profile'
import Shortcuts from './utils/Shortcuts'
import { useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';

const SideBar = () => {

  const isLoading = useSelector(state => state.users.isLoading);

  if (isLoading) return <div className='flex flex-col items-center justify-center gap-5 m-5'>
    <Skeleton className='h-80! w-full hidden md:flex' />
    <Skeleton className='h-80! w-full hidden md:flex' />
  </div>

  return (
    <div>
      <div>
        <Profile />
        <Shortcuts />
      </div>
    </div>
  );
};

export default SideBar;
