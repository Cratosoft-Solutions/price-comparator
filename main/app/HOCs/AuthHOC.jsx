"use client";
import axios from "axios";
import React, { useState } from "react";
import { verifyTokenWithJose } from "@utils/authFunctionsClient";
import { useSession } from "next-auth/react";
import cookieCutter from 'cookie-cutter'
import { AUTH_CREDENTIALS } from "@utils/constants";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
 

function withAuth(Component, isSecure = false) {
  function newAuthComponent() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const refreshToken = async () => {
      try {
        /*let cookieValue = await cookieCutter.get(process.env.NEXT_PUBLIC_TOKEN_COOKIE);
        console.log(cookieValue);
        const validToken = await verifyTokenWithJose(cookieValue);
        if (!validToken) {
          await axios.post("/api/auth/token",{},{
            headers: {
              'Authorization': `Basic ${AUTH_CREDENTIALS}`
            }
          });
        }*///TODO
        setLoading(false);
      } catch (error) {
        setLoading(false);
        router.push("/unauthorized");
        return null;
      }
    };

    const userIsAuthenticated = async () => {
      try {
        const session = await getSession();
        const user = session?.user;
        if (isSecure && !user) {
          router.push("/unauthorized");
        }else{
          setLoading(false);
          return true;
        }
        
      } catch (error) {
        setLoading(false);
        router.push("/unauthorized");
        return false;
      }
    };

    return (
        <Component
          refreshToken={refreshToken}
          userIsAuthenticated={userIsAuthenticated}
          isLoading={loading}
        />
    );
  }

  return newAuthComponent;
}

export default withAuth;
