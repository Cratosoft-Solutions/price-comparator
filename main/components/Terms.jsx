"use client"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfiguration } from "@app/redux/slices/termsConditions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { genericStorageManagement } from "@utils/functions";
const Terms = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userTerms } = useSelector((state) => state.termsConditions);
  const dispatch = useDispatch();

  const setOption = (option) =>{
    genericStorageManagement("add", "terms", option);
    switch (option) {
        case 1:
            dispatch(setConfiguration({userReviewedTerms:true, allCookies:true}))
            break;
        case 2:
            dispatch(setConfiguration({userReviewedTerms:true, esentialCookies:true}))
            break;
        case 3:
            dispatch(setConfiguration({userReviewedTerms:false, termsConditions:false}))
            router.push(`/termsrejected?callBackUrl=${pathname}`)
            break;
        default:
            dispatch(setConfiguration({userReviewedTerms:false}))  
            break;
    }
  }

  useEffect(()=>{
      const termsPreviousAccepted = genericStorageManagement("get", "terms");
      if(termsPreviousAccepted.result && termsPreviousAccepted.value){
        setOption(Number(termsPreviousAccepted.value));
      }else{
        setOption(99);
      }
  }, [])

  if(userTerms.userReviewedTerms)
    return;

  return (
    <div className="w-full fixed bottom-0 !bg-white border   border-gray-200 p-4 shadow-md lg:w-100 rounded  mx-0.5 mb-1">
      <h2 className="mb-2 text-xl font-heading font-black">Términos de Servicio y Uso de Cookies</h2>
      <p className="mb-4 leading-relaxed text-black">
      Nuestro sitio utiliza cookies, lo que nos permite para ofrecer el mejor servicio y experiencia al cliente posible.  {" "}
        <Link className="font-semibold text-blue-700 hover:underline" href={`/termsandconditions?callBackUrl=${pathname}`}>
          Términos de Servicio 
        </Link>
        .
      </p>
      <div className="grid space-between justify-left lg:grid-cols-3 gap-2 ">
          <button onClick={()=> {setOption(1)}} className="black_btn_sqr">Acepto todas las cookies y Términos de Servicio</button>
          <button onClick={()=> {setOption(2)}} className="outline_btn">Acepto sólo las cookies esenciales y Términos de Servicio</button>
          <button onClick={()=> {setOption(3)}} className="bg-[#40A826] text-white">No acepto el uso de cookies o Términos de Servicio</button>
      </div>
    </div>
  );
};

export default Terms;
