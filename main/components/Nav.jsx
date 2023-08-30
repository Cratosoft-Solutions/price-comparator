"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toogleDropDown, setToogleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="fixed top-0 w-full flex-between p-3 z-40 bg-white">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/comparator-logo.png"
          alt="randal logo"
          width={50}
          height={60}
          className="object-contain"
        />
        <p className="text-medium font-bold text-black">Comparador de Precios</p>
      </Link>
      
      {/* Desktop navitation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/adminStore" className="black_btn">
              Mi tienda
            </Link>
            <button type="button" onClick={(e)=>{e.preventDefault(); signOut(); }} className="outline_btn">
              Salir
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={(e) => {
                    e.preventDefault(); 
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Ingresar
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToogleDropDown((prev) => !prev)}
            />
            {toogleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToogleDropDown(false)}
                >
                  Mi perfil
                </Link>
                <Link href="/adminStore" className="black_btn">
                  Mi tienda
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); 
                    setToogleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
