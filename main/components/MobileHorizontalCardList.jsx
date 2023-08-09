import React from 'react'
import MobileProductCard from './MobileProductCard'

const MobileHorizontalCardList = ({ productList}) => {
  return (
    <>
        {productList.map((product)=>(
            <MobileProductCard product={product}></MobileProductCard>
        ))}
    </>
  )
}

export default MobileHorizontalCardList