import React from 'react'
import StoreItem from './store/StoreItem'

const EditItemWrapper = ({product}) => {
  return (
    <StoreItem editMode="true" product={product} />
  )
}

export default EditItemWrapper