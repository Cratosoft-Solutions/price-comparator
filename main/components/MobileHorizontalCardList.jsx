import React from 'react'
import MobileProductCard from './MobileProductCard'
 
const MobileHorizontalCardList = ({mergedProducts, adminMode = false, callBackFunction=()=>{}}) => {
  return (
    <>
    {!adminMode &&
      <div className="w-full items-center justify-left p-6 bg-white mt-2 items-end">
          <p className="text-sm text-black font-black"> {`Encontramos ${mergedProducts.length} anuncios.`}</p>
      </div>
    }
      
      {mergedProducts.map((product, index) => (
          <MobileProductCard key={index} product={product} index={index} adminMode={adminMode} callBackFunction={callBackFunction}></MobileProductCard>
        ))}
    </>
  );
}

export default MobileHorizontalCardList