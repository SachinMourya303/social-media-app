import { Input } from '@/components/ui/input'
import { BiSolidBrightnessHalf } from "react-icons/bi";
import { Bell, CircleUser, Home, MessageCircleMore, Search, } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOut, setDarkMode } from '../stateManagement/slice/authSlice';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { userDetails , darkmode } = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  return (
    <div className={darkmode ? 'bg-darkmode-theme' : 'bg-white'}>
      <div className='grid grid-cols-[0.5fr_1fr_1fr_1fr] items-center px-5 py-3'>
        <strong id='website-name' className={darkmode ? 'text-gray-100 text-2xl' : 'text-2xl'}>TwitBook</strong>

        <div className={`flex gap-2 items-center px-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${darkmode ? 'bg-darkmode-element' : 'bg-gray-100' } rounded-full w-[80%]`}>
          <Search className={`size-5 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`} />
          <Input className={`w-full border-0 ring-0! outline-none ${darkmode ? 'placeholder:text-darkmode-text' : 'placeholder:text-gray-500'}`} placeholder='Search' />
        </div>

        <div className='flex items-center gap-2'>
          <Link to='/' className='flex gap-2 bg-app-theme/10 p-2 rounded-lg'>
            <Home className='text-app-theme cursor-pointer' />
            <span className='text-app-theme cursor-pointer'>Home</span>
          </Link>

          <div className='flex items-center w-full justify-around'>
            <BiSolidBrightnessHalf onClick={() => dispatch(setDarkMode(true))} className={`text-3xl ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
            <MessageCircleMore className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
            <Bell className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
          </div>
        </div>

        <div className='flex items-center justify-end gap-2'>
          <figure>
            {userDetails?.users?.profile !== null
              ? (
                <div onClick={() => dispatch(logOut())}>
                  {<img src={userDetails?.users?.profile} alt="profile" className='w-8 h-8 rounded-full hover:ring-4 hover:ring-app-theme cursor-pointer' />}
                </div>
              )
              : (<CircleUser onClick={() => dispatch(logOut())} className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />)
            }
          </figure>

          <figcaption>
            {userDetails?.users?.username !== ""
              ? (
                <span className={`text-xl ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>{userDetails?.users?.username}</span>
              )
              : (
                <span>No User found</span>
              )
            }
          </figcaption>
        </div>
      </div>
    </div>
  )
}

export default Navbar
