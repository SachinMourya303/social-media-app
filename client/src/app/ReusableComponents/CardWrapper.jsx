import React from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const CardWrapper = ({ children }) => {
  const { darkmode } = useSelector(state => state.userAuth);

  return (
    <div className={`hidden xl:flex flex-col pt-5 p-5 ${darkmode ? 'bg-darkmode-theme' : 'bg-white'} m-5 rounded-lg`}>
        {children}
    </div>
  );
};

export default CardWrapper;
