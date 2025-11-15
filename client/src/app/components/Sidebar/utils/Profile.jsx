import { websiteLogo } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { userDetails, darkmode } = useSelector(state => state.userAuth);
  const loggedUser = useSelector(state => state.users.loggedUser);
  const posts = useSelector((state) => state.users.posts);
  const postsArray = posts?.posts || [];
  const filteredPosts = postsArray.filter(post => post.userId === loggedUser?._id);

  const followers = useSelector((state) => state.users.followers);
  const following = useSelector((state) => state.users.following);

  const userCredentails = [
    { credential: filteredPosts?.length, credentialName: 'Post' },
    { credential: followers.length, credentialName: 'Followers' },
    { credential: following.length, credentialName: 'Following' },
  ]

  return (
    <div className={`hidden xl:flex flex-col items-center justify-center pt-5 p-5 ${darkmode ? 'bg-darkmode-theme' : 'bg-white'} m-5 rounded-lg`}>
      <div className='flex flex-col items-center justify-center bg-gradient-to-b from-app-theme/50 to-app-theme/0 w-full h-full rounded-lg p-5'>
        <figure className='w-20 h-20 rounded-full overflow-hidden border-4 border-white'>
          {userDetails?.users?.profile !== null
            ? (
              <img src={userDetails.users.profile} alt="profile" className='w-full h-full object-cover object-center' />
            )
            : (
              <img src={websiteLogo.dummyUserIcon} alt="profile" className='w-full h-full object-cover object-center' />
            )
          }
        </figure>
        <figcaption className={`${darkmode ? 'text-darkmode-text font-bold' : 'text-gray-500 font-bold'}`}>{userDetails.users.username}</figcaption>
        <figcaption className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>{userDetails.users.email}
        </figcaption>
      </div>

      <div className='flex justify-between w-full border-t border-app-theme/50 mt-5 py-5'>
        {userCredentails.map((credentials, index) => (
          <div key={index} className='flex flex-col items-center justify-center'>
            <strong className={`${darkmode ? 'text-darkmode-text' : 'text-gray-700'}`}>{credentials.credential}</strong>
            <span className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>{credentials.credentialName}</span>
          </div>
        ))}
      </div>

      <div className='flex w-full mt-3'>
        <Button onClick={() => navigate(`/user/profile/${userDetails?.users?._id}`)} className='flex-1 w-full bg-app-theme hover:bg-app-theme/80 cursor-pointer'>My Profile</Button>
      </div>
    </div>
  )
}

export default Profile