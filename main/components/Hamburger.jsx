import { useRouter } from 'next/navigation';
import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { setExpandedBar } from '@app/redux/slices/siteNav';
import { useDispatch } from 'react-redux';


const Hamburger = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const expandOrCollapseVerticalNav=()=>{
        dispatch(setExpandedBar(true));
    }

  return (
    <div className="hover:cursor-pointer ml-1 lg:ml-10 flex justify-start items-center gap-4" >
    <RxHamburgerMenu              
      className="w-8 h-8 lg:h-6 lg:w-6 text-dark-text hover:text-accent-glow transition-colors"
      onClick={expandOrCollapseVerticalNav} 
    />
    <img onClick={()=>{router.push("/")}} src="/assets/images/logo.svg" className="hidden lg:block h-14 w-32 brightness-110" alt="Encuentra productos y servicios en Costa Rica"></img>
    <img onClick={()=>{router.push("/")}} src="/assets/images/logo.svg" className="block lg:hidden h-22 w-28 brightness-110" alt="Donde encontras los mejores produtos y servicios de Costa Rica"></img>
  </div>
  )
}

export default Hamburger
