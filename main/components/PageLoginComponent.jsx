"use client"
import LoginRegister from '@components/LoginRegister'
import React, {useEffect} from 'react'
import withAuth from '@app/HOCs/AuthHOC'
import Loading from '@app/loading'

const Login = ({refreshToken, isLoading}) => {
  useEffect(() => {
    refreshToken();
  }, [])
  
  return (
    <>{!isLoading ? <LoginRegister isLogin={true} /> : <Loading message={"Por favor espere..."} />}</>
  )
}

export default withAuth(Login)