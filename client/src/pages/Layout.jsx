import UserDetails from '@/app/popups/UserDetails'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/app/components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '@/app/components/Sidebar/SideBar'
import PopupWrapper from '@/app/ReusableComponents/PopupWrapper'
import SearchTab from '@/app/popups/SearchTab'
import StoryTab from '@/app/popups/StoryTab'
import { setLoggedUser } from '@/app/stateManagement/slice/usersSlice'
import RightOutlet from '@/pages/RightOutlet'
import PostTab from '@/app/popups/PostTab'
import PreviewPosts from '@/app/popups/PreviewPosts'

const Layout = () => {
  const { userDetails , darkmode } = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersData);  

   useEffect(() => {
    if (userDetails?.users?._id && users?.length > 0) {
      const fetchLoggedUser = users.find(
        (loggedU) => loggedU._id === userDetails.users._id
      );
      if (fetchLoggedUser) {
        dispatch(setLoggedUser(fetchLoggedUser));
      }
    }
  }, [userDetails, users, dispatch]);

  return (
    <div className={`h-screen overflow-hidden! ${darkmode ? 'bg-darkmode h-screen' : 'bg-gray-50 h-screen'}`}>
      <div>
        <PopupWrapper >
          <SearchTab />
          <StoryTab />
          <PostTab />
          <PreviewPosts />
        </PopupWrapper>
      </div>
      <div>
        <Navbar />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-[0fr_2fr_1fr]  xl:grid-cols-[0.7fr_2fr_1fr]'>
        <SideBar />
        <Outlet />
        <RightOutlet />
      </div>
    </div>
  )
}

export default Layout