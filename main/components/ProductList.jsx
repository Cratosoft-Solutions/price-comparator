"use client";
import React from 'react'
import HorizontalCardList from './HorizontalCardList';
import HorizontalCardListLoading from './HorizontalCardListLoading';
import MobileHorizontalCardList from './MobileHorizontalCardList';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const { storeFullProducts, storeFullMatchedProducts } = useSelector(state => state.products);
  const {configuration} = useSelector(state => state.searchoptions);
  const { loading } = useSelector(state =>state.siteloading);
  
  const mergedProducts = configuration.MATCH? storeFullMatchedProducts:storeFullProducts;

  return (
    <div className="mt-12 lg:mt-1">
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