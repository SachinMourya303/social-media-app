import { setPreviewPostBox } from '@/app/stateManagement/slice/popupSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const { darkmode } = useSelector(state => state.userAuth);
  const loggedUser = useSelector(state => state.users.loggedUser);
  const posts = useSelector(state => state.users.posts);
  const dispatch = useDispatch();
const { userId } = useParams();
  const postsArray = posts?.posts || [];


  const filteredPosts = postsArray.filter(post => post.userId === userId);


  return (
    <div className='border-t w-full mt-5 pt-5'>
      <div className='flex gap-1 flex-wrap'>
        {
          filteredPosts.length > 0 ? (
            filteredPosts.toReversed().map((post) => (
              <figure onClick={() => dispatch(setPreviewPostBox(post?._id))} key={post} className='w-[100px] h-[100px] md:w-[170px] md:h-[170px] xl:w-[230px] xl:h-[230px] mb-1 cursor-pointer'>
                <img src={post?.url} alt="" className='h-full w-full object-cover object-center' />
              </figure>
            ))) : 'No post yet'
        }
      </div>
    </div>
  )
}

export default UserPosts