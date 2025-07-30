import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {
  const {navigate} = useContext(AppContext);
  const {search} = useLocation();
  const query = new URLSearchParams(search);
  const nextURL = query.get("next");

  useEffect(() => {
    if(nextURL) {
      setTimeout(() => {
        navigate(`/${nextURL}`)
      }, 7000);
    }
  }, [nextURL])
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg font-medium">Processing your payment...</p>
      </div>
    </div>
  );
};

export default Loading;
