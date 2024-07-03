"use client"
import { getFormattedPrice } from '@utils/currencyExchangeUtil';
import { calculatePercentage, calculateTotal, calculateTotalWithPercentage } from '@utils/functions';
import React, { useState } from 'react'
import { MdOutlineArrowRight } from 'react-icons/md';
import PaymentTermsAndConditions from './PaymentTermsAndConditions';
import Modal from './Modal';

const PaymentModal = ({paymentDetail, onConfirm, modalActionInfo}) => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showConfirmAction, setShowConfirmAction] = useState(false);
    const onCancel =()=>{
        setShowConfirmAction(false);
    }

    const internalOnConfirm =()=>{
        //TODO Inicio del proceso del pago

        //TODO Fin del proceso de pago
        onConfirm(modalActionInfo.processToExecute);
    }

    const executePayment=(e)=>{
        e.preventDefault();
        setShowConfirmAction(true);
    }

  return (
    <div className="fixed bg-opacity-30 top-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-black p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full">
     {showConfirmAction && (
          <Modal modalActionInfo={modalActionInfo} onConfirm={internalOnConfirm} onCancel={onCancel} />)}
      <section className="bg-white antialiased mt-20 md:mt-0 p-4 md:rounded-lg">
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
            <div className="mt-6 sm:mt-8 md:flex md:items-start md:gap-8">
              <form
                action="#"
                onSubmit={executePayment}
                className="w-full md:w-fit  rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="card-number-input"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      {" "}
                      Número de Tarjeta*{" "}
                    </label>
                    <input
                      type="text"
                      id="card-number-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                       required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="full_name"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      {" "}
                      Nombre* (Igual que en tarjeta){" "}
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Nombre en tarjeta"
                      required
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label
                      for="card-expiration-input"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Fecha de expiración*{""}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        datepicker
                        datepicker-format="mm/yy"
                        id="card-expiration-input"
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label
                      for="cvv-input"
                      className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900"
                    >
                      CVV*
                      <button
                        data-tooltip-target="cvv-desc"
                        data-tooltip-trigger="hover"
                        className="text-gray-400 hover:text-gray-900"
                      >
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        id="cvv-desc"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                      >
                        The last 3 digits on back of card
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </label>
                    <input
                      type="number"
                      id="cvv-input"
                      aria-describedby="helper-text-explanation"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="w-full black_btn_sqr">
                  Pagar ahora
                </button>
              </form>

              <div className="mt-6 sm:mt-8 md:mt-0 md:w-80">
                <div className="space-y-4 rounded-lg border bg-[#EEDECF] border-none p-6">
                  <div className="space-y-2">
                    <div className="flex inline">
                      <span className="inline w-full text-base font-normal text-gray-500">
                        {paymentDetail.detail}
                      </span>
                      <span className="inline flex text-base font-medium text-gray-900 w-full justify-end">
                        {`${paymentDetail.currency} ${getFormattedPrice(
                          paymentDetail.price.total
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
                        {`${paymentDetail.currency} ${getFormattedPrice(
                          calculatePercentage(
                            calculateTotal(paymentDetail.price),
                            0.13
                          )
                        )}`}
                      </span>
                    </div>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-black pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      {`${paymentDetail.currency} ${getFormattedPrice(
                        calculateTotalWithPercentage(paymentDetail.price, 0.13)
                      )}`}
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