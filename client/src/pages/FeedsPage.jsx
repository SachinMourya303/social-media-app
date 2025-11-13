import Story from '@/app/components/Feeds/utils/Story'
import { setIsLoading, setPosts, setUsers } from '@/app/stateManagement/slice/usersSlice';
import { Skeleton } from 'primereact/skeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Posts from '@/app/components/Feeds/Posts';

const FeedsPage = () => {

  const isLoading = useSelector(state => state.users.isLoading);
  const loggedUser = useSelector(state => state.users.loggedUser);
  const posts = useSelector(state => state.users.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/post/allposts`);
      dispatch(setPosts(response.data));
    };
    fetchAllPosts();
  }, [posts]);


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
    <div className='overflow-hidden'>
      <div className='h-[700px] w-full overflow-y-auto no-scrollbar mt-5'>
        <Story />
        <Posts />
      </div>

    </div>
  )
}

export default FeedsPage