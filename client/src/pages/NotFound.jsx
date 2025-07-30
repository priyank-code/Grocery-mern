import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const NotFound = () => {
  const {navigate} = useContext(AppContext);
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <a onClick={() => navigate("/")} className="text-primary-dark underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
