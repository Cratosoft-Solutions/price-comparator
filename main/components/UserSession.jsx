import Image from 'next/image'
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";


const UserSession = () => {
  const { data: session } = useSession();
  return (
    <div className='grid grid-cols-1 grid-rows-auto'>
      <span className='w-full flex justify-center p-4 text-dark-text'>{session?.user?.email}</span>
    <div className="w-full flex justify-center p-4  !pt-0">
      {session?.user?.image ? (
        <Image
          src={session?.user?.image}
          width={74}
          height={74}
          className="inline rounded-full ring-2 ring-accent-primary"
          alt="profile"
          onClick={() => alert(false)}
        />
      ) : (
        <FaUser className='text-dark-muted w-6 h-6' />
      )}
    </div>
    <div
        className="w-full flex justify-center p-4 !pt-0 hover:cursor-pointer"
        onClick={() => {
          session?.user ? signOut() : signIn();
        }}
      >
        <span className="font-black text-dark-text hover:text-accent-glow transition-colors">
          {session?.user ? "Cerrar Sesión" : "Iniciar Sesión"}
        </span>
      </div>
    </div>
    
  );
}

export default UserSession
