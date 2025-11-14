import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Auth from './pages/authontication/Auth';
import Layout from './pages/Layout';
import UserDetails from './app/popups/UserDetails';
import FeedsPage from './pages/FeedsPage';

import { setFollowers, setFollowing, setIsLoading, setUsers } from './app/stateManagement/slice/usersSlice';
import UserProfilePage from './pages/UserProfilePage';
import StoryPreview from './pages/StoryPreview';
import RightOutlet from './pages/RightOutlet';
import NotificationPage from './app/components/Notificationpage/NotificationPage';
import ChatPage from './app/components/ChatPage/ChatPage';
import UserChats from './app/components/ChatPage/utils/UserChats';

const App = () => {
  const dispatch = useDispatch();
  const { userToken, userDetails } = useSelector((state) => state.userAuth);
  const users = useSelector((state) => state.users.usersData);


  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/users/user-details`);
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const accountHolder = users.find(
    (user) => user.email === userToken?.users?.email
  );

  useEffect(() => {
    if (data?.users) {
      dispatch(setUsers(data.users));
    }
    dispatch(setIsLoading(isPending));
  }, [data, isPending, dispatch]);

  useEffect(() => {
    if (accountHolder && users.length > 0) {
      const following = users.filter((user) =>
        accountHolder.following?.some((f) => f.email === user.email)
      );
      dispatch(setFollowing(following));
    }

    if (accountHolder && users.length > 0) {
      const followers = users.filter((user) =>
        accountHolder.followers?.some((f) => f.email === user.email)
      );
      dispatch(setFollowers(followers));
    }
  }, [accountHolder, users, dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={userToken === '' ? <Auth /> : <Navigate to="/user-details" />} />
        <Route path="/user-details" element={userDetails === '' ? <UserDetails /> : <Navigate to="/" />} />

        <Route path="/" element={userDetails === '' ? <Navigate to="/login" /> : <Layout />}>
          <Route index element={<FeedsPage />} />
          <Route path='user/profile/:userId' element={<UserProfilePage />} />
        </Route>

        <Route path="stories/:storyId" element={<StoryPreview />} />

        <Route path='right-outlet' element={<RightOutlet />} >
          <Route index element={<ChatPage />} />
          <Route path='notification' element={<NotificationPage />} />
          <Route path='message' element={<UserChats />} />
        </Route>
      </Routes>

    </>
  );
};

export default App;
