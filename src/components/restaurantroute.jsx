import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';

const RestaurantRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.publicMetadata?.role !== 'restaurant') {
      navigate('/signin');
    }
  }, [user, navigate]);

  return <Component {...rest} />;
};
export default RestaurantRoute;