"use client";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";

const Terms = () => { 
  const searchParams = useSearchParams();  
  const callBackUrl = searchParams.get("callBackUrl")||"";
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full lg:w-1/2 shadow-lg p-4">
        <div className="w-full orange_gradient flex text-center text-4xl">
          Términos y condiciones
        </div>
        <div className=" p-4  flex text-justify items-center justify-center w-full h-full lg:h-1/2 overflow-y-scroll">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
          justo quis quam accumsan tristique. Suspendisse potenti. Ut vel odio
          vel libero accumsan facilisis. In hac habitasse platea dictumst.
          Vivamus dapibus metus nec justo efficitur, at vulputate elit
          hendrerit. Integer sed lectus euismod, luctus sem in, vulputate arcu.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Duis consequat sem ut dolor lobortis, eget
          rhoncus turpis vulputate. Quisque suscipit felis et quam posuere, in
          mattis lacus interdum. Fusce dignissim, lacus sit amet consequat
          cursus, elit risus hendrerit orci, nec pharetra arcu velit eget sem.
          Nunc vel metus ut mauris tincidunt fermentum vel vitae felis. Proin ac
          mi id elit cursus malesuada ut eu elit. In hac habitasse platea
          dictumst. Sed congue justo vel tortor dapibus, at interdum mauris
          tincidunt. Curabitur commodo, ligula ut posuere vehicula, lectus elit
          ullamcorper odio, ac varius libero justo eu turpis. Vestibulum
          dignissim nisl eget augue eleifend scelerisque. Integer laoreet sem
          sit amet ipsum facilisis, ac fermentum elit congue. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nulla vel justo quis quam
          accumsan tristique. Suspendisse potenti. Ut vel odio vel libero
          accumsan facilisis. In hac habitasse platea dictumst. Vivamus dapibus
          metus nec justo efficitur, at vulputate elit hendrerit. Integer sed
          lectus euismod, luctus sem in, vulputate arcu. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Duis consequat sem ut dolor lobortis, eget rhoncus turpis
          vulputate. Quisque suscipit felis et quam posuere, in mattis lacus
          interdum. Fusce dignissim, lacus sit amet consequat cursus, elit risus
          hendrerit orci, nec pharetra arcu velit eget sem. Nunc vel metus ut
          mauris tincidunt fermentum vel vitae felis. Proin ac mi id elit cursus
          malesuada ut eu elit. In hac habitasse platea dictumst. Sed congue
          justo vel tortor dapibus, at interdum mauris tincidunt. Curabitur
          commodo, ligula ut posuere vehicula, lectus elit ullamcorper odio, ac
          varius libero justo eu turpis. Vestibulum dignissim nisl eget augue
          eleifend scelerisque. Integer laoreet sem sit amet ipsum facilisis, ac
          fermentum elit congue.
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

export default Terms;
