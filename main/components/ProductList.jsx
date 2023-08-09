"use client";
import React from 'react'
import HorizontalCardList from './HorizontalCardList';
import HorizontalCardListLoading from './HorizontalCardListLoading';
import MobileHorizontalCardList from './MobileHorizontalCardList';

const ProductList = ({data, loading}) => {
  return (
    <>
        <div className='container mx-auto hidden lg:block '>
                { data && <HorizontalCardList  data={data}/>
                }
                {loading && <HorizontalCardListLoading/>}
        </div>
        <div className='container mx-auto block lg:hidden '>
        {data.map((element )=> (
          <MobileHorizontalCardList  productList={element.companyProducts} />
        ))
        }
        {loading && <HorizontalCardListLoading/>}
    </div>
  </>
  )
}

export default ProductList;