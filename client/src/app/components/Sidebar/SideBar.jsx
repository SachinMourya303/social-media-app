import React, { useEffect } from 'react'
import Profile from './utils/Profile'
import Shortcuts from './utils/Shortcuts'
import { Skeleton } from '@/components/ui/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setUsers } from '@/app/stateManagement/slice/usersSlice';
import axios from 'axios';

const SideBar = () => {
  const users = useSelector(state => state.users.usersData);
  const dispatch = useDispatch();

  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/users/user-details`);
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.users) {
          console.log(data?.users);
      dispatch(setUsers(data.users));
    }
  }, [data, dispatch]);

  if (isPending) return <div className='flex flex-col items-center justify-center gap-5 m-5'>
    <Skeleton className='h-80 w-full hidden md:flex' />
    <Skeleton className='h-80 w-full hidden md:flex' />
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
