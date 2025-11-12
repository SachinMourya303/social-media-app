import { Input } from '@/components/ui/input'
import { BiSolidBrightnessHalf } from "react-icons/bi";
import { Bell, ChevronDown, CircleFadingPlus, CircleUser, Home, LogOutIcon, Menu, MessageCircleMore, Moon, PlusCircle, Search, SearchIcon, Sun, X, } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOut, setDarkMode } from '../stateManagement/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from 'primereact/skeleton';
import { setRightOutletBox, setSearchDialogBox } from '../stateManagement/slice/popupSlice';



const Navbar = () => {
  const { userDetails, darkmode } = useSelector(state => state.userAuth);
  const notification = useSelector((state) => state.users.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('Home');

  const menuList = [
    { title: 'Home', clickFunction: () => { navigate('/'); setMenu(false); setActive('Home') }, icon: <Home className={`size-7 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} group-hover:text-app-theme`} /> },
    { title: 'Search', clickFunction: () => { navigate('/'); setMenu(false); setActive('Search'); dispatch(setSearchDialogBox(true)) }, icon: <SearchIcon className={`size-7 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} group-hover:text-app-theme`} /> },
    { title: 'Create', clickFunction: () => { navigate('/'); setMenu(false); setActive('Create') }, icon: <CircleFadingPlus className={`size-7 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} group-hover:text-app-theme`} /> },
    { title: 'Theme', clickFunction: () => { dispatch(setDarkMode(true)); setMenu(false); setActive('Theme') }, icon: <BiSolidBrightnessHalf className={`size-7 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} group-hover:text-app-theme`} /> },
    { title: 'Message', clickFunction: () => { navigate('/'); setMenu(false); setActive('Message'); dispatch(setRightOutletBox('chatpage')) }, icon: <MessageCircleMore className={`size-7 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} group-hover:text-app-theme`} /> },
    { title: 'Notification', clickFunction: () => { navigate('/'); setMenu(false); setActive('Notification'); dispatch(setRightOutletBox('notification')); }, icon: <Bell className={`size-7 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} group-hover:text-app-theme`} /> }
  ]

  const isLoading = useSelector(state => state.users.isLoading);

  if (isLoading) return <div className='flex items-center justify-between gap-5 px-5 py-3'>
    <Skeleton className='h-10! w-50!' />
    <Skeleton className='h-10! w-100! hidden md:flex' />
    <div className='flex justify-evenly items-center w-100'>
      <Skeleton className='h-10! w-10! rounded-full! hidden md:flex' />
      <Skeleton className='h-10! w-10! rounded-full! hidden md:flex' />
      <Skeleton className='h-10! w-10! rounded-full!' />
      <Skeleton className='h-10! w-10! rounded-full!' />
      <Skeleton className='h-10! w-10! rounded-full!' />
    </div>

    <Skeleton className='h-10! w-50! hidden md:flex' />

  </div>
  return (
    <div>
      <div className={darkmode ? 'bg-darkmode-theme' : 'bg-white'}>
        {/* Desktop view */}
        <div className='grid grid-cols-[0.5fr_1fr] md:grid-cols-[0.5fr_1fr_1fr_1fr_0fr] items-center px-5 py-3'>
          <strong id='website-name' className={darkmode ? 'text-app-theme text-2xl' : 'text-2xl'}>TwitBook</strong>

          <div onClick={() => dispatch(setSearchDialogBox(true))} className={`hidden md:flex gap-2 items-center cursor-text px-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${darkmode ? 'bg-darkmode-element' : 'bg-gray-100'} rounded-full w-[80%]`}>
            <Search className={`size-5 ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`} />
            <Input className={`w-full border-0 ring-0! shadow-none outline-none ${darkmode ? 'placeholder:text-darkmode-text' : 'placeholder:text-gray-500'}`} placeholder='Search friends' disabled />
          </div>

          <div className='hidden md:flex items-center gap-2'>
            <Link to='/' className='flex gap-2 bg-app-theme/10 hover:bg-app-theme/20 p-2 rounded-lg'>
              <Home className='text-app-theme cursor-pointer' />
            </Link>

            <div className='flex items-center w-full justify-evenly'>
              <CircleFadingPlus className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />

              <BiSolidBrightnessHalf onClick={() => dispatch(setDarkMode(true))} className={`text-3xl ${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
              <div className='relative'>
                <MessageCircleMore onClick={() => dispatch(setRightOutletBox('chatpage'))} className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
                <span className='flex items-center justify-center absolute top-[-8px] right-[-7px] bg-app-theme text-white rounded-full w-4 h-4 text-xs'>0</span>
              </div>

              <div className='relative'>
                <Bell onClick={() => dispatch(setRightOutletBox('notification'))} className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
                <span className='flex items-center justify-center absolute top-[-8px] right-[-7px] bg-app-theme text-white rounded-full w-4 h-4 text-xs'>{notification.length}</span>
              </div>
            </div>
          </div>

          <div className='hidden md:flex items-center justify-end gap-2'>
            <figure>
              {userDetails?.users?.profile !== null
                ? (
                  <div onClick={() => dispatch(logOut())}>
                    {<img src={userDetails?.users?.profile} alt="profile" className='w-8 h-8 object-cover object-center rounded-full hover:ring-4 hover:ring-app-theme cursor-pointer' />}
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

          <div className='flex md:hidden items-center gap-3'>
            <div className='flex items-center w-full justify-end gap-3'>
              <div className='relative'>
                <MessageCircleMore className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
                <span className='flex items-center justify-center absolute top-[-8px] right-[-7px] bg-app-theme text-white rounded-full w-4 h-4 text-xs'>0</span>
              </div>

              <div className='relative'>
                <Bell className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
                <span className='flex items-center justify-center absolute top-[-8px] right-[-7px] bg-app-theme text-white rounded-full w-4 h-4 text-xs'>{notification.length}</span>
              </div>
            </div>

            <div>
              <Menu onClick={() => setMenu(!menu)} className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}

      {menu
        ? (
          <div className='flex md:hidden'>
            <div className={`absolute z-10 p-5 top-0 ${darkmode ? 'bg-darkmode-theme' : 'bg-white'} w-[75%] h-screen shadow-lg transition-all`}>

              <div onClick={() => setMenu(!menu)} className='flex justify-end items-center'><X /></div>

              <div className='flex items-center gap-2 my-5'>
                <figure>
                  {userDetails?.users?.profile !== null
                    ? (
                      <div onClick={() => dispatch(logOut())}>
                        {<img src={userDetails?.users?.profile} alt="profile" className='w-15 h-15 object-cover object-center rounded-lg hover:ring-4 hover:ring-app-theme cursor-pointer' />}
                      </div>
                    )
                    : (<CircleUser onClick={() => dispatch(logOut())} className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} hover:text-app-theme cursor-pointer`} />)
                  }
                </figure>

                <figcaption>
                  {userDetails?.users?.username !== ""
                    ? (
                      <div className='flex flex-col'>
                        <span className={`text-xl ${darkmode ? 'text-darkmode-text' : 'text-gray-500'}`}>{userDetails?.users?.username}</span>
                        <span className={`text-xs ${darkmode ? 'text-darkmode-text' : 'text-gray-300'}`}>{userDetails?.users?.email}</span>
                      </div>
                    )
                    : (
                      <span>No User found</span>
                    )
                  }
                </figcaption>
              </div>

              <hr />

              <div className='mt-10'>
                {
                  menuList.map((menu, index) => (
                    <div onClick={menu.clickFunction} key={index} className={`flex items-center gap-2 group p-3 mt-5 ${active === menu.title ? 'bg-app-theme/20' : ''} hover:bg-app-theme/20 rounded-lg cursor-pointer transition-all`}>
                      <div >{menu.icon}</div>
                      <div className={`${darkmode ? 'text-darkmode-text' : 'text-gray-500'} group-hover:text-app-theme`}>{menu.title}</div>
                    </div>
                  ))
                }
              </div>


              <Button onClick={() => dispatch(logOut())} className='bg-red-500 w-[90%] mx-5 flex items-center gap-3 absolute left-0 bottom-5 hover:bg-red-500/80 cursor-pointer'>
                <span>Logout</span>
                <LogOutIcon />
              </Button>

            </div>
          </div>
        ) : (
          ""
        )}
    </div>
  )
}

export default Navbar
