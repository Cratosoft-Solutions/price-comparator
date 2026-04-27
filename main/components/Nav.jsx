"use client";
import Link from "next/link";
import SearchButton from "./SearchButton";
import NavCategoriesBar from "./NavCategoriesBar";
import { RiInformationFill } from "react-icons/ri";
import { FaFacebookF, FaRegHandPointRight } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BTN_SEARCH_DEFAULT_BEHAVIOUR } from "@utils/constants";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import UserLogin from "./UserLogin";
import Hamburger from "./Hamburger";



const Nav = () => {
  const { data: session } = useSession();

  const onUserSelected=()=>{
    if (session?.user){
      signOut();
    }else{
      signIn();
    } 
    }

  return (
    <>
      <div className="lg:mr-10 lg:ml-10 w-100 grid grid-rows-1 lg:grid-cols-[50%_50%] grid-cols-2 lg:grid-cols-[70%_30%] h-14 pt-10 pl-6 lg:pl-10 lg:pr-10 pb-8 bg-dark-bg">
        <div className="flex lg:hidden" >
          <Hamburger />
        </div>
        <div className="animate-pulse inline justify-start flex items-center gap-2 hidden lg:flex lg:inline">
          <FaRegHandPointRight  className="w-6 h-6 inline" color="#FF7043" />
          <Link
            href="/"
            className="inline flex items-center justify-left text-dark-muted text-xs"
          >
            ¡Descubre una forma fácil de buscar y vender lo que necesites!
          </Link>
        </div>
        <div className="flex h-full items-center justify-end">
          <div className="grid auto-cols-auto grid-flow-col lg:divide-x-2 lg:divide-dark-border">
            <div className="pl-6 pr-6 hidden lg:block text-dark-text">Esp</div>
            <div className="pl-6 pr-6 block lg:hidden"><UserLogin/></div>
            <div className="hover:text-accent-glow pl-6 lg:pr-6 hidden lg:block hover:cursor-pointer text-dark-text transition-colors" onClick={()=>{onUserSelected()}}>
              {session?.user ? 
                "Cerrar Sesión"              
              : "Iniciar Sesión"}
              </div>
          </div>
        </div>
      </div>
      
      <div className="block lg:hidden w-full bg-dark-surface z-40 p-2">
          <SearchButton personalizedClass='!h-14 border rounded-full border-dark-border shadow-lg shadow-dark-surface/50 mb-2 mt-2 '/>
      </div>

      <NavCategoriesBar />
    </>
  );
};

export default Nav;
