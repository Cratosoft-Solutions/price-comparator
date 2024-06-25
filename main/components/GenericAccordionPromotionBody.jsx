import React from 'react'
import { CiSquareCheck } from 'react-icons/ci'
import { FaColonSign } from 'react-icons/fa6'

const GenericAccordionPromotionBody = ({bodyToBeRendered, selectedOption, onOptionSelected, index}) => {

    return (
    <>
        <div key={"_"+index} className="flex items-center mb-4">
            <span className="text-gray-600  ms-2  text-justify text-base">{bodyToBeRendered.detail}</span>
        </div>

        <div className="ml-10 grid grid-cols-1 gap-y-2 lg:gap-y-1 gap-x-2">
        {bodyToBeRendered.features.map(
            (feature, internalIndex) => (
            <div key={internalIndex} className="flex items-center mb-4">
                <CiSquareCheck
                id={`feature-${feature.key}`}
                key={`feature-${feature.key}`}
                className="w-4 h-4"
                color="green"
                />
                <label
                htmlFor={`feature-${feature.key}`}
                className="ms-2 text-base font-medium text-gray-600"
                >
                {feature.label}
                </label>
            </div>
            )
        )}
        </div>
    </>
  )
}

export default GenericAccordionPromotionBody

