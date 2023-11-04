"use client";
import React, {useEffect} from 'react';
import Search from '@components/Search';
import withAuth from '@app/HOCs/AuthHOC';


const MySearch = ({refreshToken}) => {
  useEffect(() => {
    refreshToken();
  }, [])
  
  return (
      <Search />
  );
}

export default withAuth(MySearch);