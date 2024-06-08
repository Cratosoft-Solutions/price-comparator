"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { isMobile } from "@utils/functions";
import SearchButton from "./SearchButton";
import NavToogleDropDown from "./NavToogleDropDown";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import NavCategoriesBar from "./NavCategoriesBar";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const [toogleDropDown, setToogleDropDown] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="lg:mr-10 lg:ml-10 w-100 grid grid-rows-1 lg:grid-cols-[15%_50%_35%] grid-cols-[49%_1%_50%] h-14 justify-center pt-10 pl-6 lg:pl-10 lg:pr-10 pr-4 pb-8">
        <div className="justify-start lg:justify-end flex bg-red-900">
          <Link href="/" className="flex gap-2 flex-center">
            <Image
              src={`/assets/images/${
                isMobile() ? "min-" : ""
              }comparator-logo.svg`}
              alt="logo"
              width={isMobile() ? 90 : 220}
              height={isMobile() ? 50 : 80}
              className={`${isMobile()?'logo-mobile':''}`}
            />
          </Link>
        </div>
        <div className="items-center lg:justify-start flex  lg:pl-2 bg-green-200">
          {!isMobile() && <SearchButton />}
        </div>

        <div className="flex relative items-center justify-end lg:justify-start bg-red-900">
          <div className="grid grid-rows-1 grid-cols-[30%_70%] lg:grid-cols-[20%_30%_50%] gap-2 items-center">
            <div className="flex items-center justify-end">
              <Image
                src={
                  session?.user?.image
                    ? session.user.image
                    : "/assets/images/userProfile.svg"
                }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToogleDropDown((prev) => !prev)}
              />
            </div>
            {!isMobile() && (
              <div
                className=" hover:cursor-pointer  flex items-center text-center justify-start"
                onClick={() => setToogleDropDown((prev) => !prev)}
              >
                <span>
                  {session?.user ? "Cerrar Sesión" : "Iniciar Sesión"}
                </span>
              </div>
            )}
            <div className="flex items-center justify-center ml-2">
              <button onClick={()=>{router.push("/mystore")}} className=" hover:cursor-pointer  max-w-96 w-64 lg:w-64 bg-[#40A826] hover:bg-[#40A826] text-white px-2 py-2 text-sm rounded-full inline-flex items-center">
                <IoArrowUpCircleOutline className="w-6 h-6 mr-1" />
                <span>Vende tu producto</span>
              </button>
            </div>
            {toogleDropDown && (
              <NavToogleDropDown
                userConnected={session?.user}
                onSelected={setToogleDropDown}
              />
            )}
          </div>
        </div>
      </div>
      {isMobile() && (
        <div className="w-full bg-orange-500 ">
          <SearchButton />
        </div>
      )}

      <NavCategoriesBar />
    </>
  );
};

export default Nav;
