import React from 'react';
import { useDispatch } from "react-redux";
import { setExpandedBar } from '@app/redux/slices/siteNav';
import { RxHamburgerMenu } from 'react-icons/rx';
import SiteCategories from './SiteCategories';

const NavCategoriesBar = () => {
  const dispatch = useDispatch();

  const expandBar =()=> {
    dispatch(setExpandedBar(true));
  }

  return (
        <div className="  w-full bg-[#D9D9D9] h-10 grid grid-flow-col auto-cols-max overflow-x-scroll no-scrollbar lg:gap-8 gap-4 lg:justify-start md:overflow-visible">
          <div className=" hover:cursor-pointer  lg:ml-10 flex justify-start items-center" onClick={expandBar}>
            <RxHamburgerMenu              
              className="h-6 w-6"
              color="black"
            />
            <span className='ml-1 font-black'>Otras opciones</span>
          </div>
          <SiteCategories/>
        </div>
  )
}

export default NavCategoriesBar