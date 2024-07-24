import React, {  useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { CiLogin, CiLogout, CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoAddSharp, IoCloseOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { setMyStoreConfig } from "@app/redux/slices/verticalNav";
import { useDispatch } from "react-redux";
import { useIsVisible } from "@utils/functionsClient";
import { MdAppRegistration } from "react-icons/md";
import { useRouter } from "next/navigation";
import UserSession from "./UserSession";

const NavToogleDropDown = ({ userConnected, onSelected }) => {
    return userConnected? ddlUserConnected(onSelected):ddlUserDisconnected(onSelected);
};

const ddlUserConnected = (onSelected) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onSelectedButton=(btnNAVPage, btnID)=>{    
    switch (btnNAVPage) {
      case "myStore":
        dispatch(setMyStoreConfig(btnID));
        router.push("/mystore");
        break;       
      default:
        break;
    }
    
    onSelected(false);
  }

  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);

  return (
    <div ref={ref1} className= {`transition-opacity ease-in duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"} absolute top-0 lg:top-6 lg:right-28 w-screen	max-heigh-available lg:h-fit right-0 lg:w-96 lg:rounded-2xl bg-gray-100 shadow-2xl border border-gray-300 z-[100]`}>
         <IoCloseOutline onClick={() => { onSelected(false); }} className="absolute h-10 w-10 right-4 mt-4 lg:mt-2 lg:right-4 stroke-gray-900"/>
         <UserSession/>
              <div className="grid items-center gap-4 grid-cols-2 grid-auto-rows">
                <Link className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 items-center w-full justify-center hover:cursor-pointer hover:shadow hover:bg-green-50' 
                href={"/"}
                onClick={() => {
                  onSelectedButton(onSelected(false));
                }}>
                  <div className='w-full flex justify-center'>
                    <GoHome className='text-black w-8 h-8'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center text-black'>Home</span>  
                </Link>
                <button className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 w-full justify-center hover:cursor-pointer hover:shadow' 
                onClick={() => {
                  onSelectedButton(
                    "myStore",  
                    "CONFIG"
                  );
                }}>
                  <div className='w-full flex justify-center'>
                    <CiSettings className='w-8 h-8 text-black'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center text-black'>Mi perfil</span>  
                </button>
                <button className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 w-full justify-center hover:cursor-pointer hover:shadow' 
                onClick={() => {
                  onSelectedButton(
                    "myStore",  
                    "ADDPRODUCT"
                  );
                }}>
                  <div className='w-full flex justify-center'>
                    <IoAddSharp className='w-8 h-8 text-black'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center text-black'>Publicar</span>  
                </button>
                <button className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 w-full justify-center hover:cursor-pointer hover:shadow' 
                onClick={() => {
                  onSelectedButton(
                    "myStore",  
                    "LISTITEM"
                  );
                }}>
                  <div className='w-full flex justify-center'>
                    <CiCircleList className='w-8 h-8 text-black'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center text-black'>Mis anuncios</span>  
                </button>
          </div>
          <span className="text-xs flex justify-center text-center w-full p-4">{"@2024-2025 encuentralofacilcr.com / Todos los derechos reservados"}</span>

    </div>
  );
};


const ddlUserDisconnected = (onSelected) => {
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);
    return (
      <div ref={ref1} className= {`transition-opacity ease-in duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"} absolute top-0 lg:top-6 lg:right-28 w-screen	max-heigh-available lg:h-fit right-0 lg:w-96 lg:rounded-2xl bg-gray-100 shadow-2xl border border-gray-300 z-[100]`}>

         <IoCloseOutline onClick={() => { onSelected(false); }} className="absolute h-10 w-10 right-4 mt-4 lg:mt-2 lg:right-4 stroke-gray-900"/>

        <UserSession/>
        <div className="grid  items-center gap-4 grid-cols-1 grid-auto-rows">
          <Link
            className="flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 items-center w-full justify-center hover:cursor-pointer hover:shadow hover:bg-green-50"
            href="/registere"
            onClick={() => onSelected(false)}
          >
            <div className="w-full flex justify-center">
              <MdAppRegistration  className="w-8 h-8 text-black" />
            </div>
            <span className="flex text-sm font-black w-full justify-center text-black">
              Registrar mi usuario
            </span>
          </Link>
        </div>
        <span className="text-xs flex justify-center text-center w-full p-4">{"@2024-2025 encuentralofacilcr.com / Todos los derechos reservados"}</span>
      </div>
    );
  };
  

export default NavToogleDropDown;
