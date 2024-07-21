import React from 'react'

const GenericAnimation = ({message, animation="animate-bounce"}) => {
  return (
    <span className="w-full lg:w-full relative flex h-6">
        <div className={`${animation} text-center h-6 w-96 lg:w-96 !bg-green-600 opacity-90 !text-base !text-white`}>{message}</div>        
    </span>
  )
}

export default GenericAnimation