"use client"
import React from 'react';
import { FacebookShare, WhatsappShare } from "react-share-kit";
import { IoClose } from 'react-icons/io5';

const SocialShare = ({ pid, sid, onCloseFunction}) => {

  return (
    <div div className='fixed bg-black bg-opacity-30 top-0 left-0 right-0 z-50 w-full max-heigh-available flex items-center justify-center'>
      <div className='rounded shadow-lg bg-white grid grid-flow-col auto-cols-auto grid-rows-1 gap-2 p-2'>
        <FacebookShare url={`https://encuentralofacilcr.com/productdetail?pid=${pid}&sid=${sid}`} size={64} 
        hashtag={'#encuentralofacilcr'}/>
        <WhatsappShare url={`https://encuentralofacilcr.com/productdetail?pid=${pid}&sid=${sid}` }size={64} separator=":: " />
        <IoClose className='w-8 h-8 hover:cursor-pointer' color='gray' onClick={()=>{onCloseFunction(false)}} >Cerrar</IoClose>
      </div>
    </div>
  );
};

export default SocialShare;