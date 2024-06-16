import React from 'react';
import { useDispatch } from "react-redux";
import { setExpandedBar } from '@app/redux/slices/siteNav';
import { RxHamburgerMenu } from 'react-icons/rx';
import SiteCategories from './SiteCategories';
import SearchButton from './SearchButton';
import UserLogin from './UserLogin';

const NavCategoriesBar = () => {
  const dispatch = useDispatch();

  const expandBar =()=> {
    dispatch(setExpandedBar(true));
  }

  return (
        <div className="w-full bg-[#FCF8F8] h-fit grid grid-flow-col auto-cols-max overflow-x-scroll no-scrollbar lg:gap-8 gap-4 lg:justify-start md:overflow-visible ">
          <div className="hover:cursor-pointer  lg:ml-10 flex justify-start items-center gap-4" onClick={expandBar}>
            <RxHamburgerMenu              
              className="h-6 w-6"
              color="black"
            />
            <img src="/assets/images/logo.svg" className="hidden md:block h-14 w-32"></img>
            <img src="/assets/images/logo-mb.svg" className="block md:hidden h-8 w-8"></img>
          </div>
          <SiteCategories/>
          <SearchButton personalizedClass='hidden md:block md:!w-80'/>
          <UserLogin personalizedClass='hidden md:flex md:justify-end'/>
        </div> 
  )
}

export default NavCategoriesBar