import React from 'react';
import SiteCategories from './SiteCategories';
import SearchButton from './SearchButton';
import UserLogin from './UserLogin';
import Hamburger from './Hamburger';

const NavCategoriesBar = () => {

  return (
    <div className='flex inline'>
        <div className="pl-4 inline w-full bg-[#FCF8F8] h-14 grid grid-flow-col auto-cols-max overflow-x-scroll no-scrollbar lg:gap-8 gap-4 lg:justify-start lg:overflow-visible ">
          <div className="hidden lg:block" >
            <Hamburger />
          </div>
          <SiteCategories/>
          <div className='flex w-full h-full items-center '>
            <div className='border border-white rounded-l-full rounded-r-full h-10'>
              <SearchButton personalizedClass='z-50 !h-10 hidden lg:block lg:!w-full border rounded-full border-gray-300 shadow-[1px_1px_3px_3px_rgba(0,0,0,0.04)]'/>
            </div>
          </div>
        </div> 
        <UserLogin personalizedClass='bg-[#FCF8F8] hidden lg:flex justify-end inline min-w-fit items-center pr-10 lg:h-14'/>

    </div>   
  )
}

export default NavCategoriesBar