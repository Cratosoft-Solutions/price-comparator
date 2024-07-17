import React from 'react';
import { useDispatch } from "react-redux";
import { setExpandedBar } from '@app/redux/slices/siteNav';
import { RxHamburgerMenu } from 'react-icons/rx';
import SiteCategories from './SiteCategories';
import SearchButton from './SearchButton';
import UserLogin from './UserLogin';
import { useRouter } from 'next/navigation';

const NavCategoriesBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const expandBar =()=> {
    dispatch(setExpandedBar(true));
  }

  return (
    <div className='flex inline'>
        <div className="inline w-full bg-[#FCF8F8] h-14 grid grid-flow-col auto-cols-max overflow-x-scroll no-scrollbar lg:gap-8 gap-4 lg:justify-start lg:overflow-visible ">
          <div className="hover:cursor-pointer ml-1 lg:ml-10 flex justify-start items-center gap-4" >
            <RxHamburgerMenu              
              className="h-6 w-6"
              color="black"
              onClick={expandBar}
            />
            <img onClick={()=>{router.push("/")}} src="/assets/images/logo.svg" className="hidden lg:block h-14 w-32"></img>
            <img onClick={()=>{router.push("/")}} src="/assets/images/logo-mb.svg" className="block lg:hidden h-8 w-8"></img>
          </div>
          <SiteCategories/>
          <div className='flex w-full h-full items-center '>
            <div className='border rounded-l-full rounded-r-full h-10'>
              <SearchButton personalizedClass='z-50 !h-10 hidden lg:block lg:!w-full'/>
            </div>
          </div>
        </div> 
        <UserLogin personalizedClass='bg-[#FCF8F8] hidden lg:flex justify-end inline min-w-fit items-center pr-10 lg:h-14'/>

    </div>   
  )
}

export default NavCategoriesBar