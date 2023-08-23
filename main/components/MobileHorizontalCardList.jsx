import React from 'react'
import MobileProductCard from './MobileProductCard'

const MobileHorizontalCardList = ({mergedProducts}) => {
  return (
    <>
      {mergedProducts.map((product, index) => (
          <MobileProductCard key={index} product={product} index={index}></MobileProductCard>
        ))}
    </>
  );
}

export default MobileHorizontalCardList