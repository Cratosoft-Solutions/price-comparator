"use client"
import LoginRegister from '@components/LoginRegister'
import React, {useEffect} from 'react'
import withAuth from '@app/HOCs/AuthHOC'

const Login = ({refreshToken}) => {
  useEffect(() => {
    refreshToken();
  }, [])
  
  return (
    <LoginRegister isLogin={true} />
  )
}

export default withAuth(Login)