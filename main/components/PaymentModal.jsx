"use client"
import { getFormattedPrice } from '@utils/currencyExchangeUtil';
import { calculatePercentage, calculateTotal, calculateTotalWithPercentage } from '@utils/functions';
import React, { useState } from 'react'
import { MdOutlineArrowRight } from 'react-icons/md';
import PaymentTermsAndConditions from './PaymentTermsAndConditions';
import Modal from './Modal';
import CreateCharge from './payments/CreateCharge';
import { PAYMENT_ERROR_ACTION } from '@utils/constants';

const PaymentModal = ({paymentDetail, paymentIntentId, onConfirm}) => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [modalActionInfo, setModalActionInfo] = useState({});
    const [showConfirmAction, setShowConfirmAction] = useState(false);
  
    const onCancel =()=>{
        setShowConfirmAction(false);
    }

    const onPaymentExecuted =(result, data)=>{
        //TODO Inicio del proceso del pago
        if(result === 'success'){
          onConfirm("SAVEPRODUCT", data);
        }else{
          //Payment error
          setModalActionInfo({...PAYMENT_ERROR_ACTION, message: PAYMENT_ERROR_ACTION.message + data.message});
          setShowConfirmAction(true);
        }
        //TODO Fin del proceso de pago
    }

  return (
    <div className="absolute top-0 w-full h-full bg-opacity-30 z-50 flex flex-col items-start justify-start bg-black md:p-16 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full">
      {showConfirmAction && (
        
        <Modal
          modalActionInfo={modalActionInfo}
          onConfirm={onCancel}
          onCancel={onCancel}
        />
      )}

      <section className="w-full h-fit bg-white antialiased md:rounded-lg p-8">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="relative w-full bg-white inline flex items-center mb-2">
              <MdOutlineArrowRight
                className="-ml-4 hidden md:block inline w-12 h-12"
                color="black"
              />
              <p className="inline text-black w-full text-center md:text-left font-black text-2xl">
                Detalle del pago{" "}
                <span className="md:inline    hidden md:block font-black text-sm">
                  ({paymentDetail.itemName})
                </span>
              </p>
              <img
                src="/assets/images/logo.svg"
                className="hidden md:block absolute right-2 h-14 w-32"
              ></img>
              <img
                src="/assets/images/logo-mb.svg"
                className="block md:hidden absolute right-2 h-12 w-12"
              ></img>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4 md:gap-8">

            <div className="md:mt-8">
                <div className="space-y-4 rounded-lg border bg-[#EEDECF] border-none p-6">
                  <div className="space-y-2">
                    <div className="flex inline">
                      <span className="inline w-full text-base font-normal text-gray-500">
                        {paymentDetail.detail}
                      </span>
                      <span className="inline flex text-base font-medium text-gray-900 w-full justify-end">
                        {`${paymentDetail.currency} ${getFormattedPrice(
                          paymentDetail.price.original
                        )}`}
                      </span>
                    </div>

                    <div className="flex inline">
                      <span className="inline w-full text-base font-normal text-gray-500">
                        Descuento
                      </span>
                      <span className="inline flex text-base font-medium text-green-500 w-full justify-end">
                        {`-${paymentDetail.currency} ${getFormattedPrice(
                          paymentDetail.price.discount
                        )}`}
                      </span>
                    </div>

                    <div className="flex inline">
                      <span className="inline w-full text-base font-normal text-gray-500">
                        IVA
                      </span>
                      <span className="inline flex text-base font-medium text-gray-900 w-full justify-end">
                        {`${paymentDetail.currency} ${getFormattedPrice(paymentDetail.price.iva)}`}
                      </span>
                    </div>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-black pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      {`${paymentDetail.currency} ${getFormattedPrice(paymentDetail.price.total)}`}
                    </dd>
                  </dl>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <PaymentTermsAndConditions />
                </div>

                <div className="mt-1  flex items-center justify-center gap-8">
                  <div>
                    <input
                      className="w-4 h-4 accent-gray-900 dark:accent-white"
                      type="checkbox"
                      name="terms-accepted"
                      id="terms-accepted"
                      checked={termsAccepted}
                      onChange={() => {
                        setTermsAccepted((prev) => !prev);
                      }}
                    />
                    <label
                      htmlFor="terms-accepted"
                      className="text-gray-600  ml-2"
                    >
                      Aceptar términos y condiciones
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <img
                    className="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                    alt=""
                  />
                </div>
              </div>
                <div className="relative">
                    <div className={`${termsAccepted?"hidden":"block"} bg-opacity-30 absolute flex w-full h-full bg-black z-50 justify-center items-center`}><span className="animate-bounce text-2xl font-black text-black">Para continuar, acepta términos y condiciones.</span></div>
                    <CreateCharge paymentIntentId={paymentIntentId} onPaymentExecuted={onPaymentExecuted}/>
                </div>
              </div>

            <p className="mt-2 text-center text-gray-500 sm:mt-8 lg:text-left">
              Pago procesado por{" "}
              <a
                href="#"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline"
              >
                PASARELA DE PAGO
              </a>{" "}
              para{" "}
              <a
                href="https://encuentralofacilcr.com"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline"
              >
                Encuentralo Facil CR
              </a>
              - Costa Rica
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentModal