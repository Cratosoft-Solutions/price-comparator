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
    <div className={`z-50 flex h-full relative items-center justify-end ${personalizedClass}`}>
          <div className="grid grid-rows-1 grid-cols-[50%_50%] gap-2 items-center">
            <div className="flex items-center justify-end">
              <img
                src={
                  session?.user?.image
                    ? session.user.image
                    : "/assets/images/userProfile.svg"
                }
                className="rounded-full h-8 w-8 md:h-8 md:w-8"
                alt="profile"
                onClick={() => setToogleDropDown((prev) => !prev)}
              />
            </div>

            <div
              className="hidden md:block w-full hover:cursor-pointer  flex items-center justify-end"
              onClick={() => setToogleDropDown((prev) => !prev)}
            >
              <span className='w-20'>
                {session?.user ? "Mi perfil" : ""}
              </span>
            </div>

            {toogleDropDown && (
              <NavToogleDropDown
                userConnected={session?.user}
                onSelected={setToogleDropDown}
              />
            )}
          </div>
        </div>
  )
}

export default UserLogin