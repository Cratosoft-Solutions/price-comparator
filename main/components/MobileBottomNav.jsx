"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setExpandedBar } from "@app/redux/slices/siteNav";
import { setMyStoreConfig } from "@app/redux/slices/verticalNav";
import useScrollDirection from "@hooks/useScrollDirection";

const MobileBottomNav = ({ onSearchClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { scrollDirection } = useScrollDirection(15);

  const isHidden = scrollDirection === "down";

  const navItems = [
    {
      id: "home",
      label: "Inicio",
      icon: GoHome,
      action: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      id: "search",
      label: "Buscar",
      icon: IoSearchOutline,
      action: onSearchClick,
      isActive: pathname?.startsWith("/search"),
    },
    {
      id: "publish",
      label: "Publicar",
      icon: IoAddCircle,
      action: () => {
        if (session?.user) {
          dispatch(setMyStoreConfig("ADDPRODUCT"));
          router.push("/mystore");
        } else {
          signIn();
        }
      },
      isActive: false,
      isPrimary: true,
    },
    {
      id: "profile",
      label: "Perfil",
      icon: FaUser,
      action: () => {
        if (session?.user) {
          dispatch(setMyStoreConfig("CONFIG"));
          router.push("/mystore");
        } else {
          signIn();
        }
      },
      isActive: pathname === "/mystore",
    },
    {
      id: "more",
      label: "Más",
      icon: RxHamburgerMenu,
      action: () => dispatch(setExpandedBar(true)),
      isActive: false,
    },
  ];

  return (
    <motion.nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-surface/90 backdrop-blur-xl border-t border-dark-border/50 safe-area-bottom"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? 100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
                item.isPrimary
                  ? "text-accent-glow -mt-4"
                  : item.isActive
                  ? "text-accent-glow"
                  : "text-dark-muted"
              }`}
            >
              {item.isPrimary ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 transition-all duration-200 ${item.isActive ? "scale-110" : ""}`} />
              )}
              <span className={`text-[10px] mt-0.5 font-medium ${item.isPrimary ? "mt-1" : ""}`}>
                {item.label}
              </span>

              {/* Active dot indicator */}
              {item.isActive && !item.isPrimary && (
                <motion.div
                  className="absolute -top-0.5 w-1 h-1 rounded-full bg-accent-glow"
                  layoutId="bottomNavIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default MobileBottomNav;
