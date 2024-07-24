"use client";
import React from 'react'
import { useState } from "react";
import { useSession } from "next-auth/react";
import NavToogleDropDown from "./NavToogleDropDown";
import { useRouter } from "next/navigation";

const UserLogin = ({personalizedClass}) => {
    const { data: session } = useSession();
    const [toogleDropDown, setToogleDropDown] = useState(false);
    const router = useRouter();
  return (
    <div className={`z-50 flex h-full lg:relative items-center justify-end ${personalizedClass}`}>
          <div className=" gap-2 items-center">
            <div className="flex items-center justify-end hover:cursor-pointer">
              <img
                src={
                  session?.user?.image
                    ? session.user.image
                    : "/assets/images/userProfile.svg"
                }
                className="rounded-full h-8 w-8 lg:h-10 lg:w-10"
                alt="profile"
                onClick={() => setToogleDropDown((prev) => !prev)}
              />
            </div>

          </div>
          {toogleDropDown && (
              <NavToogleDropDown
                userConnected={session?.user}
                onSelected={setToogleDropDown}
              />
            )}
        </div>
  )
}

export default UserLogin