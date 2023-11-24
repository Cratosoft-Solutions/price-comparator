import React from 'react'
import MobileProductCard from './MobileProductCard'

const MobileHorizontalCardList = ({mergedProducts}) => {
  return (
    <>
      <div className="w-full items-center justify-left p-6">
        <p className="text-2xl font-[800]">Busca el producto perfecto para ti.</p>
      </div>
      {mergedProducts.map((product, index) => (
          <MobileProductCard key={index} product={product} index={index}></MobileProductCard>
        ))}
    </>
  );
}

export default MobileHorizontalCardList