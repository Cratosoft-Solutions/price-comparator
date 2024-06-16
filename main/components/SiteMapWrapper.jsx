"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import SiteMap from './SiteMap';
import { EXCLUDE_SITE_MAP } from '@utils/constants';

const SiteMapWrapper = () => {
    const pathname = usePathname();

  return (
    <>
        {EXCLUDE_SITE_MAP.includes(pathname)? null: <SiteMap/>}
    </>
  )
}

export default SiteMapWrapper;