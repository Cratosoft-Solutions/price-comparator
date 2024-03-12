import { isMobile } from '@utils/functions'
import Image from 'next/image'
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";


const UserSession = () => {
  const { data: session } = useSession();
  return (
    <div className="inline flex items-center justify-start p-4 gap-4">
      {session?.user?.image ? (
        <Image
          src={session?.user?.image}
          width={37}
          height={37}
          className="inline rounded-full"
          alt="profile"
          onClick={() => alert(false)}
        />
      ) : (
        <FaUser className='text-white w-6 h-6' />
      )}

      <div
        className="inline flex items-center text-center justify-start"
        onClick={() => {
          session?.user ? signOut() : signIn();
        }}
      >
        <span className="font-black text-white">
          {session?.user ? "Cerrar Sesión" : "Iniciar Sesión"}
        </span>
      </div>
    </div>
  );
}

export default UserSession