import React from 'react'

const BTNPublish = () => {
  return (
    <div className='w-full flex justify-center p-4'>
        <button className='text-white bg-[#40A826] rounded-lg font-black text-xl w-full md:w-60 h-32 relative hover:shadow-[3px_3px_3px_3px_rgba(0.3,0.3,0.3,0.3)]'>
            <div className='absolute rounded-full bg-[#40A826]  animate-ping h-4 w-4 -top-1 -right-1 '></div>
            Publicar mi anuncio
        </button>
    </div>
  )
}

export default BTNPublish