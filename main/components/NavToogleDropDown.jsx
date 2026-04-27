import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoAddSharp, IoCloseOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { setMyStoreConfig } from "@app/redux/slices/verticalNav";
import { useDispatch } from "react-redux";
import { MdAppRegistration } from "react-icons/md";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import UserSession from "./UserSession";

const NavToogleDropDown = ({ userConnected, onSelected }) => {
    return userConnected ? ddlUserConnected(onSelected) : ddlUserDisconnected(onSelected);
};

const ddlUserConnected = (onSelected) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const ref1 = useRef();

  const onSelectedButton = (btnNAVPage, btnID) => {
    switch (btnNAVPage) {
      case "myStore":
        dispatch(setMyStoreConfig(btnID));
        router.push("/mystore");
        break;
      default:
        break;
    }
    onSelected(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref1.current && !ref1.current.contains(e.target)) {
        onSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onSelected]);

  const menuItems = [
    { label: "Home", icon: GoHome, action: () => { router.push("/"); onSelected(false); }, isLink: true, href: "/" },
    { label: "Mi perfil", icon: CiSettings, action: () => onSelectedButton("myStore", "CONFIG") },
    { label: "Publicar", icon: IoAddSharp, action: () => onSelectedButton("myStore", "ADDPRODUCT") },
    { label: "Mis anuncios", icon: CiCircleList, action: () => onSelectedButton("myStore", "LISTITEM") },
  ];

  return (
    <motion.div
      ref={ref1}
      className="absolute top-0 lg:top-8 lg:right-0 w-screen lg:h-fit right-0 lg:w-80 lg:rounded-2xl bg-dark-elevated/95 backdrop-blur-xl shadow-2xl border border-dark-border/50 z-[100] overflow-hidden"
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <button
        onClick={() => onSelected(false)}
        className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-dark-card transition-colors z-10"
      >
        <IoCloseOutline className="h-5 w-5 text-dark-muted" />
      </button>

      <UserSession />

      <div className="grid items-center gap-2 grid-cols-2 p-4 pt-0">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-dark-card/50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-dark-surface flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                <Icon className="w-5 h-5 text-dark-text group-hover:text-accent-glow transition-colors" />
              </div>
              <span className="text-xs font-bold text-dark-text group-hover:text-accent-glow transition-colors">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mx-4 h-px bg-dark-border/30" />
      <span className="text-dark-muted text-xs flex justify-center text-center w-full p-3">
        @2024-2025 encuentralofacilcr.com / Todos los derechos reservados
      </span>
    </motion.div>
  );
};

const ddlUserDisconnected = (onSelected) => {
  const ref1 = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref1.current && !ref1.current.contains(e.target)) {
        onSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onSelected]);

  return (
    <motion.div
      ref={ref1}
      className="absolute top-0 lg:top-8 lg:right-0 w-screen lg:h-fit right-0 lg:w-80 lg:rounded-2xl bg-dark-elevated/95 backdrop-blur-xl shadow-2xl border border-dark-border/50 z-[100] overflow-hidden"
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <button
        onClick={() => onSelected(false)}
        className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-dark-card transition-colors z-10"
      >
        <IoCloseOutline className="h-5 w-5 text-dark-muted" />
      </button>

      <UserSession />

      <div className="p-4 pt-0">
        <Link
          className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-dark-card/50 transition-all duration-200 group"
          href="/register"
          onClick={() => onSelected(false)}
        >
          <div className="w-12 h-12 rounded-xl bg-dark-surface flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
            <MdAppRegistration className="w-6 h-6 text-dark-text group-hover:text-accent-glow transition-colors" />
          </div>
          <span className="text-sm font-bold text-dark-text group-hover:text-accent-glow transition-colors">
            Registrar mi usuario
          </span>
        </Link>
      </div>

      <div className="mx-4 h-px bg-dark-border/30" />
      <span className="text-dark-muted text-xs flex justify-center text-center w-full p-3">
        @2024-2025 encuentralofacilcr.com / Todos los derechos reservados
      </span>
    </motion.div>
  );
};

export default NavToogleDropDown;
