"use client"
import LoginRegister from '@components/LoginRegister'
import React, {useEffect} from 'react';
import withAuth from '@app/HOCs/AuthHOC';
import Loading from '@app/loading';

const Register = ({refreshToken, isLoading}) => {
  useEffect(() => {
    refreshToken();
  }, [])
  
  return (
    <>{!isLoading ? <LoginRegister isLogin={false} /> : <Loading message={"Por favor espere..."} />}</>

  )
}

export default withAuth(Register)