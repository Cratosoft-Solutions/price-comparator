import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';


const NavToogleDropDown = ({ userConnected, onSelected }) => {
    return userConnected? ddlUserConnected(onSelected):ddlUserDisconnected(onSelected);
};

const ddlUserConnected = (onSelected) => {
  const router = useRouter();
  return (
    <div className="dropdown">
      <button
        className="dropdown_link"
        onClick={(e) => {
          router.push("/mystore");
          onSelected(false);
        }}
      >
        Vender
      </button>
      <Link
        href="/profile"
        className="dropdown_link"
        onClick={(e) => {
          e.preventDefault();
          onSelected(false);
          signOut();
        }}
      >
        Cerrar Sesión
      </Link>
    </div>
  );
};


const ddlUserDisconnected = (onSelected) => {
    return (
        <div className="dropdown">
        <Link
          href="/login"
          className="dropdown_link"
          onClick={() => onSelected(false)}
        >
          Ingresar
        </Link>
        <Link href="/register" className="dropdown_link">
          Registrarme
        </Link>
      </div>
    );
  };
  

export default NavToogleDropDown;
