import React from 'react'
import MobileProductCard from './MobileProductCard'

const MobileHorizontalCardList = ({mergedProducts}) => {
  return (
    <>
      {mergedProducts.map((product, index) => (
          <MobileProductCard product={product}></MobileProductCard>
        ))}
    </>
  );
}

export default MobileHorizontalCardList