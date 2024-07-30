"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import SiteMap from './SiteMap';
import { EXCLUDE_SITE_MAP } from '@utils/constants';

const SiteMapWrapper = () => {
    const pathname = usePathname();
    
  return (
    <>
        {EXCLUDE_SITE_MAP.includes(formatPathName(pathname)) ? null: <SiteMap pathname={formatPathName(pathname)}/>}
    </>
  )
}

const formatPathName=(path)=>{
  const urlArray = path.split("/");
  if(urlArray.length > 2){
    return "/" + urlArray[1] + "/" + urlArray[2]
  }else{
    return path;
  }  
}

export default SiteMapWrapper;