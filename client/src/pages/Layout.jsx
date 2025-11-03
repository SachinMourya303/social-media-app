import UserDetails from '@/app/popups/UserDetails'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/app/components/Navbar'
import { useSelector } from 'react-redux'
import SideBar from '@/app/components/Sidebar/SideBar'
import ChatPage from '@/app/components/ChatPage/ChatPage'

const Layout = () => {
  const { userDetails , darkmode } = useSelector(state => state.userAuth);
  return (
    <div className={darkmode ? 'bg-darkmode h-screen' : 'bg-gray-50 h-screen'}>
      <div>
        <Navbar />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-[0fr_2fr_1fr]  xl:grid-cols-[0.7fr_2fr_1fr]'>
        <SideBar />
        <Outlet />
        <ChatPage />
      </div>
    </div>
  )
}

export default Layout