import React from 'react'

const GenericAnimation = ({message, animation="animate-bounce"}) => {
  return (
    <span className="w-32 lg:w-80 relative flex h-6">
        <div className={`${animation} text-center h-6 w-32 lg:w-64 !bg-green-600 opacity-90 !text-base !text-white`}>{message}</div>
        
    </span>
  )
}

export default GenericAnimation