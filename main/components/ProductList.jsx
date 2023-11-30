"use client";
import React from 'react'
import HorizontalCardList from './HorizontalCardList';
import HorizontalCardListLoading from './HorizontalCardListLoading';
import MobileHorizontalCardList from './MobileHorizontalCardList';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchOption } from '@app/redux/slices/configOptions';
import ShowAllResults from './ShowAllResults';
import PaginationControls from './PaginationController';


const ProductList = ({isOptionSearchExpanded}) => {
  const { storeFullProducts, storeFullMatchedProducts } = useSelector(state => state.products);
  const {configuration} = useSelector(state => state.searchoptions);
  const { loading } = useSelector(state =>state.siteloading);
  const { size } = useSelector(state =>state.sitepagination);
  const dispatch = useDispatch();
  
  const mergedProducts = configuration.MATCH? storeFullMatchedProducts:storeFullProducts;

  return (
    <div
      className={`lg:bg-gray-100 lg:pl-6 lg:pt-2 lg:pr-6 ${
        isOptionSearchExpanded ? "ml-0 lg:ml-52" : "ml-0 lg:ml-10"
      }`}
    >
      <div className="relative container mx-auto hidden lg:block">
        {!loading && mergedProducts && (
          <>
            <HorizontalCardList mergedProducts={mergedProducts} />
            <PaginationControls tableItemsAmount={mergedProducts.length} size={size} isOptionSearchExpanded={isOptionSearchExpanded}/>
          </>
        )}
        {loading && <HorizontalCardListLoading />}
      </div>
      <div className="container-fluid mx-auto block lg:hidden ">
        <MobileHorizontalCardList mergedProducts={mergedProducts} />

        {loading && <HorizontalCardListLoading />}
      </div>
      {configuration.MATCH &&
      storeFullProducts.length > 0 &&
      storeFullMatchedProducts.length == 0 ? (
        <ShowAllResults/>
      ) : null}
    </div>
  );
}

export default ProductList;