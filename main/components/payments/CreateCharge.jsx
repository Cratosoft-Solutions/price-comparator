"use client"
import { PGATEWAY_PK } from '@utils/constants';
import Script from 'next/script'
import React, { useEffect, useState } from 'react'

const CreateCharge = ({paymentIntentId, onPaymentExecuted}) => { 
  const renderOnvoModal=()=>{
    onvo.pay({
        onError : (data) => {
          onPaymentExecuted('error', data);
        },
        onSuccess : (data) => {
          onPaymentExecuted('success', data);
        },
        publicKey: PGATEWAY_PK,
        paymentIntentId : paymentIntentId,
        paymentType: "one_time",
        customerId:""
      }).render('#onvo-pay-container')
  }

  useEffect(()=>{
    renderOnvoModal();
  }, [])
  return (
    <>   
        <div id="onvo-pay-container" className='w-full h-full'> </div>
    </>
  )
}

export default CreateCharge

