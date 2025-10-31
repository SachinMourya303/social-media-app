import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Auth from './pages/authontication/Auth';
import Layout from './pages/Layout';
import UserDetails from './app/popups/UserDetails';
import FeedsPage from './pages/FeedsPage';

const App = () => {
  const { userToken, userDetails } = useSelector((state) => state.userAuth);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={userToken === "" ? <Auth /> : <Navigate to="/user-details" />}/>
        <Route path="/user-details" element={userDetails === "" ? <UserDetails /> : <Navigate to="/" />}
        />

        <Route path="/" element={userDetails === "" ? <Navigate to="/login" /> : <Layout />}>
          <Route index element={<FeedsPage />} />
        </Route>
      </Routes>

    </>
  );
};

export default App;
