import React from 'react'
import MobileProductCard from './MobileProductCard'

const MobileHorizontalCardList = ({searchConfigOptions, storeFullData, mergedProducts}) => {
  return (
    <>
      {searchConfigOptions.GROUPBYSTORE &&
        storeFullData.map((element, index) => (
          <>
            {element.companyProducts.map((product, index) => (
              <MobileProductCard product={product}></MobileProductCard>
            ))}
          </>
        ))}
      {!searchConfigOptions.GROUPBYSTORE &&
        mergedProducts.map((product, index) => (
          <MobileProductCard product={product}></MobileProductCard>
        ))}
    </>
  );
}

export default MobileHorizontalCardList