"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/navigation';


const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [toogleDropDown, setToogleDropDown] = useState(false);
  const [toogleDropDownNotSession, setToogleDropDownNotSession] = useState(false);


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="fixed top-0 w-full flex-between z-40 bg-white border-b-1 shadow  border-gray-300">
      
      <Link href="/" className="flex gap-2 flex-center p-3">
        <Image
          src="/assets/images/comparator-logo.png"
          alt="logo"
          width={200}
          height={100}
          className="object-contain"
        />
      </Link>
      
      {/* Mobile navigation*/}
      <div className="flex relative">
        {session?.user ? (
          <div className="flex p-3">
            <Image
              src={session?.user?.image? session.user.image:"/assets/images/userProfile.png"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToogleDropDown((prev) => !prev)}
            />
            {toogleDropDown && (
              <div className="dropdown">
                <button className="dropdown_link"
                  onClick={(e) => {
                    router.push("/mystore")
                    setToogleDropDown(false);
                  }}>
                  Vender
                </button>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={(e) => {
                    e.preventDefault(); 
                    setToogleDropDown(false);
                    signOut();
                  }}                >
                  Cerrar Sesión
                </Link> 
              </div>
            )}
          </div>
        ) : (
          <>
          <div className="flex w-fit p-3">
            <Image
              src={'/assets/images/userProfile.png'}
              width={37}
              height={37}
              className="rounded-full bg-gray-50"
              alt="profile"
              onClick={() => setToogleDropDownNotSession((prev) => !prev)}
            />
            {toogleDropDownNotSession && (
              <div className="dropdown">
                <Link
                  href="/login"
                  className="dropdown_link"
                  onClick={() => setToogleDropDownNotSession(false)}
                >
                  Ingresar
                </Link>
                <Link href="/register" className="dropdown_link">
                  Registrarme
                </Link>
              </div>
            )}
          </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
