import React from 'react'

const GenericAnimation = ({message}) => {
  return (
    <span className="w-1/2 relative flex h-6 items-center justify-center text-center">
        <span className=" animate-bounce  absolute h-full w-full bg-orange-600 opacity-75 !text-sm !text-white">{message}</span>
        
    </span>
  )
}

export default GenericAnimation