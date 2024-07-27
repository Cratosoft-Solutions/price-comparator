"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@app/redux/slices/loading';
import axios from 'axios';
import Link from 'next/link';
import Alert from './Alert';
import Loading from '@app/loading';

const ActivateEmailComponent = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    const userId = searchParams.get('ui');
    const [result, setResult] = useState({updated:"WAITING", message:""});
    
useEffect(()=>{
    const updateEmail = async ()=>{
        try {
            const response = await axios.put("/api/email/activate-final", {id:userId});
            console.log("dd", response.data);
            setResult(response.data);
            dispatch(setLoading(false));
        } catch (error) {
            setResult({updated: false, message: error.message});
            dispatch(setLoading(true));
        }
    }
    dispatch(setLoading(true));

    updateEmail();

}, 
[])

if(result.updated == "WAITING")
    return <Loading/>
  return (
    <div className='h-96 flex flex-col justify-center items-center'>
        <Alert message={result.message} title={"Activación de cuenta"} type={result.updated?"SUCCESS":"ALERT"}/>
        <Link href={"/login"} className='mt-4 black_btn'>Ingresar a la plataforma</Link>
    </div>
  )
}

export default ActivateEmailComponent