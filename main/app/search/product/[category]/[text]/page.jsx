"use client"
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Loading from '@app/loading';

const ExternalSearch = () => {
    const params = useParams();
const router = useRouter();
    useEffect(()=>{
        router.push(`/search/results?category=${params.category}&search=${params.text.replaceAll("-", " ")}`);
    }, 
    [])
  return (
    <Loading/>
  )
}

export default ExternalSearch