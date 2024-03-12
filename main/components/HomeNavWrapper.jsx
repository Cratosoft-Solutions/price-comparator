"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import HomeVerticalNav from './HomeVerticalNav';
import { PAGES_WITH_NAV } from '@utils/constants';

const HomeNavWrapper = () => {
    const pathname = usePathname();

  return (
    <>
        {PAGES_WITH_NAV.includes(pathname)? null: <HomeVerticalNav/>}
    </>
  )
}

export default HomeNavWrapper