"use client";
import Link from "next/link";
import { isMobile } from "@utils/functions";
import SearchButton from "./SearchButton";
import NavCategoriesBar from "./NavCategoriesBar";
import { RiInformationFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BTN_SEARCH_DEFAULT_BEHAVIOUR } from "@utils/constants";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import UserLogin from "./UserLogin";



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
      <div className="lg:mr-10 lg:ml-10 w-100 grid grid-rows-1 lg:grid-cols-[50%_50%] grid-cols-1 md:grid-cols-[70%_30%] h-14  pt-10 pl-6 lg:pl-10 md:pr-10 pb-8">
        <div className="inline justify-start flex bg-red-900 items-center gap-2 hidden md:flex md:inline">
          <RiInformationFill className="w-6 h-6 inline" color="gray" />
          <Link
            href="/"
            className="inline flex items-center justify-left text-gray-500 text-xs"
          >
            Descubre una forma fácil de buscar y vender lo que necesites!
          </Link>
        </div>
        <div className="flex h-full items-center justify-end">
          <div className="grid auto-cols-auto grid-flow-col divide-x-2 divide-black">
            <div className="grid auto-cols-auto grid-flow-col gap-6 ">
              <FaFacebookF className="w-6 h-6 inline" color="black" />
              <FaInstagram className="w-6 h-6 inline mr-6" color="black" />
            </div>
            <div className="pl-6 pr-6 hidden md:block">Esp</div>
            <div className="pl-6 pr-6 block md:hidden"><UserLogin/></div>
            <div className="pl-6 md:pr-6  hidden md:block hover:cursor-pointer " onClick={()=>{onUserSelected()}}>
              {session?.user ? 
                "Cerrar Sesión"              
              : "Iniciar Sesión"}
              </div>
          </div>
        </div>
      </div>
      {isMobile() && (
        <div className="w-full bg-orange-500 ">
          <SearchButton behaviour={{...BTN_SEARCH_DEFAULT_BEHAVIOUR, bSize:'border-2'}}/>
        </div>
      )}

      <NavCategoriesBar />
    </>
  );
};

export default Nav;
