import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const { darkmode } = useSelector(state => state.userAuth);
  const loggedUser = useSelector(state => state.users.loggedUser);
  const posts = useSelector(state => state.users.posts);
const { userId } = useParams();
  const postsArray = posts?.posts || [];
  console.log(postsArray);


  const filteredPosts = postsArray.filter(post => post.userId === userId);


  return (
    <div className='border-t w-full mt-5 pt-5'>
      <div className='flex gap-1 flex-wrap'>
        {
          filteredPosts.length > 0 ? (
            filteredPosts.toReversed().map((post) => (
              <figure key={post} className='w-[100px] h-[100px] md:w-[170px] md:h-[170px] xl:w-[230px] xl:h-[230px] mb-1'>
                <img src={post?.url} alt="" className='h-full w-full object-cover object-center' />
              </figure>
            ))) : 'No post yet'
        }
      </div>
    </div>
  )
}

export default UserPosts