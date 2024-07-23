import React, {  useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { CiLogin, CiLogout, CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoAddSharp } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { setMyStoreConfig } from "@app/redux/slices/verticalNav";
import { useDispatch } from "react-redux";
import { useIsVisible } from "@utils/functionsClient";
import { MdAppRegistration } from "react-icons/md";
import { useRouter } from "next/navigation";

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
    <div ref={ref1} className= {`transition-opacity ease-in duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"} absolute top-10 lg:top-6 lg:right-28 w-32 bg-white shadow z-[100]`}>
              <div className="grid items-center gap-4 grid-cols-1 grid-auto-rows">
                <Link className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 items-center w-full justify-center hover:cursor-pointer hover:shadow hover:bg-green-50' 
                href={"/"}
                onClick={() => {
                  onSelectedButton(onSelected(false));
                }}>
                  <div className='w-full flex justify-center'>
                    <GoHome className='w-8 h-8'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center'>Home</span>  
                </Link>
                <button className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 w-full justify-center hover:cursor-pointer hover:shadow' 
                onClick={() => {
                  onSelectedButton(
                    "myStore",  
                    "CONFIG"
                  );
                }}>
                  <div className='w-full flex justify-center'>
                    <CiSettings className='w-8 h-8'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center'>Mi perfil</span>  
                </button>
                <button className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 w-full justify-center hover:cursor-pointer hover:shadow' 
                onClick={() => {
                  onSelectedButton(
                    "myStore",  
                    "ADDPRODUCT"
                  );
                }}>
                  <div className='w-full flex justify-center'>
                    <IoAddSharp className='w-8 h-8'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center'>Publicar</span>  
                </button>
                <button className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 w-full justify-center hover:cursor-pointer hover:shadow' 
                onClick={() => {
                  onSelectedButton(
                    "myStore",  
                    "LISTITEM"
                  );
                }}>
                  <div className='w-full flex justify-center'>
                    <CiCircleList className='w-8 h-8'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center'>Mis anuncios</span>  
                </button>
                <button className='flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 w-full justify-center hover:cursor-pointer hover:shadow hover:bg-green-50' 
                onClick={() => {signOut()
                }}>
                  <div className='w-full flex justify-center'>
                    <CiLogout  className='w-8 h-8'/>
                  </div>
                  <span className='flex text-sm font-black w-full justify-center'>Cerrar Sesión</span>  
                </button>
          </div>
    </div>
  );
};


const ddlUserDisconnected = (onSelected) => {
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);
    return (
      <div
        ref={ref1}
        className={`transition-opacity ease-in duration-700 ${
          isVisible1 ? "opacity-100" : "opacity-0"
        } absolute top-10 lg:top-6 lg:right-24 w-32 bg-white shadow z-[100]`}
      >
        <div className="grid  items-center gap-4 grid-cols-1 grid-auto-rows">
          <Link
            className="flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 items-center w-full justify-center hover:cursor-pointer hover:shadow hover:bg-green-50"
            href="/login"
            onClick={() => onSelected(false)}
          >
            <div className="w-full flex justify-center">
              <CiLogin className="w-8 h-8" />
            </div>
            <span className="flex text-sm font-black w-full justify-center">
              Ingresar
            </span>
          </Link>

          <Link
            className="flex flex-wrap items-center h-16 p-1 hover:bg-gray-100 items-center w-full justify-center hover:cursor-pointer hover:shadow hover:bg-green-50"
            href="/registere"
            onClick={() => onSelected(false)}
          >
            <div className="w-full flex justify-center">
              <MdAppRegistration  className="w-8 h-8" />
            </div>
            <span className="flex text-sm font-black w-full justify-center">
              Registrarme
            </span>
          </Link>
        </div>
      </div>
    );
  };
  

export default NavToogleDropDown;
