import React from 'react'

const GenericAnimation = ({message, animation="animate-pulse"}) => {
  return (
    <span className="inline-flex">
        <div className={`${animation} text-center px-3 py-1 rounded-lg bg-accent-primary/20 border border-accent-primary/30 text-accent-glow text-sm font-semibold`}>{message}</div>        
    </span>
  )
}

export default GenericAnimation
