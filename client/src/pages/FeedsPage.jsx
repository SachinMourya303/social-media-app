import Story from '@/app/components/Feeds/utils/Story'
import { setIsLoading, setUsers } from '@/app/stateManagement/slice/usersSlice';
import { Skeleton } from 'primereact/skeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const FeedsPage = () => {

  const isLoading = useSelector(state => state.users.isLoading);
   
     if (isLoading) return <div className='flex flex-col ml-5 xl:ml-0 md:mt-10 mr-5'>
       <div className='flex justify-start gap-3'>
        <Skeleton className='w-15! h-15! rounded-full!' />
        <Skeleton className='w-15! h-15! rounded-full!' />
        <Skeleton className='w-15! h-15! rounded-full!' />
        <Skeleton className='w-15! h-15! rounded-full!' />
        <Skeleton className='w-15! h-15! rounded-full! hidden md:flex' />
        <Skeleton className='w-15! h-15! rounded-full! hidden md:flex' />
       </div>
     </div>

  return (
    <div>
      <Story />
    </div>
  )
}

export default FeedsPage