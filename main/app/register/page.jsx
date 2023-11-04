"use client"
import LoginRegister from '@components/LoginRegister'
import React, {useEffect} from 'react';
import withAuth from '@app/HOCs/AuthHOC';

const Register = ({refreshToken}) => {
  useEffect(() => {
    refreshToken();
  }, [])
  
  return (
    <LoginRegister isLogin={false} />
  )
}

export default withAuth(Register)