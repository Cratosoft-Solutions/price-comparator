"use client"
import React, { useState } from 'react'
import ProductDetailsGeneral from './ProductDetailsGeneral'
import ProductsDetailEquipment from './ProductsDetailEquipment';

const ProductDetailsTabs = ({product}) => {
const [selectedTab, setSelectedTab] = useState(1); 

  return (
    <>
    <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0" role="tablist" data-twe-nav-ref >
        <li role="presentation" className="flex-auto text-center">
            <button
            className={`lg:my-2 block border-x-0 border-t-0 border-transparent lg:px-7 pb-3.5 pt-4 text-xs font-medium ${selectedTab!=1?'':'border-b-2 text-[#40A826] border-b-[#40A826]'} transition-all duration-700 delay-75`}
            data-twe-toggle="pill"
            data-twe-target="#tabs-home01"
            data-twe-nav-active
            role="tab"
            aria-controls="tabs-home01"
            aria-selected="false"
            onClick={()=>{setSelectedTab(1)}}
            >DESCRIPCIÓN</button>
        </li>
        {product.otherInformation && 
            <li role="presentation" className="flex-auto text-center">
                <button
                className={`lg:my-2 block border-x-0 border-t-0 border-transparent lg:px-7 pb-3.5 pt-4 text-xs font-medium ${selectedTab!=2?'':'border-b-2 text-[#40A826] border-b-[#40A826]'} transition-all duration-700 delay-75`}
                data-twe-toggle="pill"
                data-twe-target="#tabs-profile01"
                role="tab"
                aria-controls="tabs-profile01"
                aria-selected="true"
                onClick={()=>{setSelectedTab(2)}}
                >GENERAL</button  >
            </li>
        }

        {product.otherInformation?.equipment && 
            <li role="presentation" className="flex-auto text-center">
                <button
                className={`lg:my-2 block border-x-0 border-t-0 border-transparent lg:px-7 pb-3.5 pt-4 text-xs font-medium ${selectedTab!=3?'':'border-b-2 text-[#40A826] border-b-[#40A826]'} transition-all duration-700 delay-75`}
                data-twe-toggle="pill"
                data-twe-target="#tabs-messages01"
                role="tab"
                aria-controls="tabs-messages01"
                aria-selected="false"
                onClick={()=>{setSelectedTab(3)}}
                >EQUIPAMENTO</button >
            </li>
        }
    </ul>

    <div className="mb-6 h-fit overflow-auto">
        <div
            className={`${selectedTab!=1?'hidden':'block'} transition-opacity duration-150 ease-linear`}
            id="tabs-home01"
            role="tabpanel"
            aria-labelledby="tabs-home-tab01"
            >
                <p className="text-base text-gray-500  ">
                        {product.productDescription}
                </p>
        </div>
        {product.otherInformation && 
            <div
                className={`${selectedTab!=2?'hidden':'block'} transition-opacity duration-150 ease-linear`}
                id="tabs-profile01"
                role="tabpanel"
                aria-labelledby="tabs-profile-tab01" 
                >
                <ProductDetailsGeneral product={product}/>
            </div>
        }
        {product.otherInformation?.equipment &&
            <div
                className={`${selectedTab!=3?'hidden':'block'} transition-opacity duration-150 ease-linear`}
                id="tabs-messages01"
                role="tabpanel"
                aria-labelledby="tabs-profile-tab01">
                <ProductsDetailEquipment  product={product}/>
            </div>
        }
    </div>
</>
  )
}

export default ProductDetailsTabs