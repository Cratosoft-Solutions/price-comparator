"use client";
import React from 'react'
import HorizontalCardList from './HorizontalCardList';
import HorizontalCardListLoading from './HorizontalCardListLoading';
import MobileHorizontalCardList from './MobileHorizontalCardList';

const ProductList = ({searchConfigOptions, mergedProducts, storeFullData, loading}) => {

  return (
    <>
        <div className='container mx-auto hidden lg:block '>
                { storeFullData && <HorizontalCardList searchConfigOptions={searchConfigOptions} storeFullData={storeFullData} mergedProducts={mergedProducts}/>
                } 
                {loading && <HorizontalCardListLoading/>}
        </div>
        <div className='container mx-auto block lg:hidden '>
          <MobileHorizontalCardList searchConfigOptions={searchConfigOptions} storeFullData={storeFullData}mergedProducts={mergedProducts} />

        {loading && <HorizontalCardListLoading/>}
    </div>
  </>
  )
}

export default ProductList;