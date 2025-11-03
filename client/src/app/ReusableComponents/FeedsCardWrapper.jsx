import React from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const FeedsCardWrapper = ({ children }) => {
  const { darkmode } = useSelector(state => state.userAuth);

  return (
    <div className={`flex pt-5 p-5 w-full ${darkmode ? 'bg-darkmode-theme' : 'bg-white'} rounded-lg`}>
        {children}
    </div>
  );
};

export default FeedsCardWrapper;
