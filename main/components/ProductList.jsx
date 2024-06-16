"use client";
import React, {useState } from "react";
import HorizontalCardList from './HorizontalCardList';
import HorizontalCardListLoading from './HorizontalCardListLoading';
import MobileHorizontalCardList from './MobileHorizontalCardList';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetails from "./store/ProductDetails";
import { setSearchOption } from '@app/redux/slices/configOptions';
import ShowAllResults from './ShowAllResults';
import PaginationControls from './PaginationController';
import withNav from "@app/HOCs/NavHOC";
import VerticalNav from "./VerticalNav"; 
import { BASIC_PRODUCT_MODEL } from '@utils/constants';


const ProductList = () => {
  const { storeFullProducts, storeFullMatchedProducts } = useSelector(state => state.products);
  const { selectedOption } = useSelector(state => state.verticalnav.productSearch);
  const showMatchedProducts = selectedOption == "MATCH";
  const { loading } = useSelector(state =>state.siteloading);
  const { size } = useSelector(state =>state.sitepagination);
  const dispatch = useDispatch();
  const [showProductDetail, setShowProductDetail]= useState(false);
  const [product, setProduct]= useState(BASIC_PRODUCT_MODEL);

  const mergedProducts = showMatchedProducts? storeFullMatchedProducts:storeFullProducts;

  const onProductSelected = (product)=>{
    setProduct(product);
    setShowProductDetail(true);
  }

  return (
    <div className={`bg-white lg:pl-6 lg:pt-2 lg:pr-6`}>
      {showProductDetail && (
        <ProductDetails
          onCloseFunction={() => {
            setShowProductDetail(false);
          }}
          storeId={product.storeId}
          productId={product.productId}
        />
      )}
      <div className="relative container mx-auto hidden lg:block">
        {!loading && mergedProducts && (
          <>
            <HorizontalCardList
              mergedProducts={mergedProducts}
              callBackFunction={onProductSelected}
            />
            <PaginationControls
              tableItemsAmount={mergedProducts.length}
              size={size}
            />
          </>
        )}
        {loading && <HorizontalCardListLoading />}
      </div>
      <div className="container-fluid mx-auto block lg:hidden ">
      {!loading && mergedProducts && (
          <>
            <MobileHorizontalCardList mergedProducts={mergedProducts}
              callBackFunction={onProductSelected}
            />
          </>
        )}
        {loading && <HorizontalCardListLoading />}
      </div>
      {showMatchedProducts &&
      storeFullProducts.length > 0 &&
      storeFullMatchedProducts.length == 0 ? (
        <ShowAllResults />
      ) : null}
    </div>
  );
}

export default ProductList;