import React from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';

const UploadedImage = ({image, imageProperties=[], onCloseFunction}) => {
  return (
        <div className="fixed bg-opacity-30 top-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-black p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full">
            <div className="flex items-center justify-center">
              <img
                  className="lg:w-1/2 sm:w-5/6 rounded bg-cyan-500 shadow-lg shadow-gray-500/50 overflow-x-auto"
                  src={image}
                  alt="Imagen del producto"
                />
            </div>
            <AiOutlineCloseCircle color='gray' className='absolute margin-y-auto top-5 h-14 w-14 ' onClick={()=>{onCloseFunction(false)}}/>
        </div>
  )
}

export default UploadedImage;