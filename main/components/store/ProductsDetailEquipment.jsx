import { CARD_EQUIPMENT, HOUSE_BENEFITS } from '@utils/constants'
import { genericItemsValue } from '@utils/functions'
import React from 'react'
import { CiSquareCheck } from 'react-icons/ci'

const ProductsDetailEquipment = ({product}) => {
  return (
    <>
        {product.category == "CAR" && (
         <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 gap-x-2">
            {product.otherInformation.equipment.map(
                (element, index) => (
                <div key={index} className="flex items-center mb-4">
                    <CiSquareCheck
                    id={`card-equipment-${element}`}
                    key={`card-equipment-${element}`}
                    className="w-4 h-4"
                    color="green"
                    />
                    <label
                    htmlFor={`card-equipment-${element}`}
                    className="ms-2 text-sm font-medium text-gray-600"
                    >
                    {genericItemsValue(CARD_EQUIPMENT, element)}
                    </label>
                </div>
                )
            )}
            </div>
        </>
        )}

        {product.category == "HOUSES" && (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-4 gap-x-2">
            {product.otherInformation.benefits.map(
                (element, index) => (
                <div key={index} className="flex items-center mb-4">
                    <CiSquareCheck
                    id={`house-benefits-${element}`}
                    key={`house-benefits-${element}`}
                    className="w-4 h-4"
                    color="green"
                    />
                    <label
                    htmlFor={`house-benefits-${element}`}
                    className="ms-2 text-sm font-medium text-gray-600"
                    >
                    {genericItemsValue(HOUSE_BENEFITS, element)}
                    </label>
                </div>
                )
            )}
            </div>
        </>
        )}
    </>
  )
}

export default ProductsDetailEquipment