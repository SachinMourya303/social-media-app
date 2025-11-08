import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const posts = useSelector((state) => state.users.Posts);
  const { userId } = useParams();
  const { userDetails, darkmode } = useSelector(state => state.userAuth);
  const users = useSelector(state => state.users.usersData);
  const findUser = users.find((user) => user._id === userId);
  
  return (
    <div className='border-t w-full mt-5 pt-5'>
      {
        posts.length === 0
          ? (
            <div className='flex flex-wrap justify-between'>
              <img src={findUser?.profile} alt="post" className='w-[200px] h-[200px] object-cover object-center'/>
              <img src={findUser?.profile} alt="post" className='w-[200px] h-[200px] object-cover object-center'/>
              <img src={findUser?.profile} alt="post" className='w-[200px] h-[200px] object-cover object-center'/>
            </div>
          ) : (
            <div>No post yet</div>
          )
      }
    </div>
  )
}

export default UserPosts