"use client";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";

const TermsRejected = () => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callBackUrl")||"";
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full lg:w-1/2 shadow-lg p-4">
        <div className="w-full orange_gradient flex text-center text-4xl">
          ¡Gracias por tu visita!
        </div>
        <div className=" p-4  flex text-justify items-center justify-center w-full h-full lg:h-1/2 overflow-y-scroll">
          {" "}
          Respetamos tu decisión, esperamos tu proxima visita!.
        </div>
        <div className="w-full flex justify-center items-center">
          <Link className="orange_btn" href={callBackUrl}>
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsRejected;
