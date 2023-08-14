"use client";
import React from 'react'
import HorizontalCardList from './HorizontalCardList';
import HorizontalCardListLoading from './HorizontalCardListLoading';
import MobileHorizontalCardList from './MobileHorizontalCardList';

const ProductList = ({mergedProducts, loading}) => {

  return (
    <div className='mt-56 lg:mt-16'>
        <div className='container mx-auto hidden lg:block '>
                { mergedProducts && <HorizontalCardList mergedProducts={mergedProducts}/>} 
                {loading && <HorizontalCardListLoading/>}
        </div>
        <div className='container mx-auto block lg:hidden '>
          <MobileHorizontalCardList mergedProducts={mergedProducts} />

        {loading && <HorizontalCardListLoading/>}
    </div>
  </div>
  )
}

export default ProductList;