import React from 'react'
import MobileProductCard from './MobileProductCard'

const MobileHorizontalCardList = ({mergedProducts, adminMode = false, callBackFunction=()=>{}}) => {
  return (
    <>
    {!adminMode &&
      <div className="w-full items-center justify-left p-6 bg-white">
        <p className="text-2xl font-[800] orange_gradient">Busca el producto perfecto para ti.</p>
      </div>
    }
      
      {mergedProducts.map((product, index) => (
          <MobileProductCard key={index} product={product} index={index} adminMode={adminMode} callBackFunction={callBackFunction}></MobileProductCard>
        ))}
    </>
  );
}

export default MobileHorizontalCardList