import React from 'react'

const MainPageInformationCategories = () => {
  return (
    <div className='mr-2 ml-2 lg:mr-10 lg:ml-10'>
        <div className="w-full mb-0 lg:mb-4 mt-4 flex justify-center lg:justify-start"><span className="text-black font-[1000] text-2xl">Categorias</span></div>

        <div className='grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1'>
            <div className='h-32 lg:h-56 w-full grid grid-cols-1 grid-rows-[70%_30%]'>
                <div className='w-full h-full flex items-end justify-center'>
                    <img className="w-1/3 lg:w-1/3" src='/assets/images/product-icon.svg'></img>
                </div>
                <div className='text-black w-full h-full flex items-center justify-center font-black'>Productos</div>
            </div>
            <div className='h-32 lg:h-56 w-full grid grid-cols-1 grid-rows-[70%_30%]'>
                <div className='w-full h-full flex items-end justify-center'>
                    <img className="w-1/3 lg:w-1/3" src='/assets/images/car-icon.svg'></img>
                </div>       
                <div className='text-black w-full h-full flex items-center justify-center font-black'>Autos</div>
            </div>
            <div className='h-32 lg:h-56 w-full grid grid-cols-1 grid-rows-[70%_30%]'>
                <div className='w-full h-full flex items-end justify-center'>
                    <img className="w-1/3 lg:w-1/3" src='/assets/images/house-icon.svg'></img>
                </div>
                <div className='text-black w-full h-full flex items-center justify-center font-black'>Casas/Aptos</div>
            </div>
            <div className='h-32 lg:h-56 w-full grid grid-cols-1 grid-rows-[70%_30%]'>
                <div className='w-full h-full flex items-end justify-center'>
                    <img className="w-1/3 lg:w-1/3" src='/assets/images/service-icon.svg'></img>
                </div>
                <div className='text-black w-full h-full flex items-center justify-center font-black'>Servicios</div>
            </div> 
        </div>
    </div>    
  )
}

export default MainPageInformationCategories