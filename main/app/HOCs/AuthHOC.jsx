"use client"
import axios from 'axios';
import React, { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { verifyTokenWithJose } from '@utils/authFunctionsClient';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function withAuth (Component, isSecure=false){
function newAuthComponent(){
    const router = useRouter();
    const {data:session} = useSession();

    const refreshToken = async() => {
        try {
            let cookieValue = getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE);
            const validToken = await verifyTokenWithJose(cookieValue) 
            if(!validToken){
                const response = await axios.get('/api/auth/token');
                setCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE,response.data.jwt)
            }
        } catch (error) {
            router.push('/unauthorized');
            return null
        }}
        
        const userIsAuthenticated = ()=>{
           try {
                const user =  session?.user;
                if(isSecure && !user)
                    router.push('/unauthorized');

                    return true;
           } catch (error) {
                if(isSecure && !user)
                    router.push('/unauthorized');
            
                return false;
           }     
        }

        return <Component refreshToken={refreshToken} userIsAuthenticated={userIsAuthenticated}/>
}


    return newAuthComponent;
  
}    

export default withAuth;