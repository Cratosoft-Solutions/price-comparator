import React from 'react';

const MainInfoCard = ({Icon, title, description, index}) => {
  return (
    <div key={`maininfocard-item-${index}`} className='w-full p-4 grid grid-rows-[20%_80%] grid-cols-1 rounded-lg bg-white'>
        <div className='top-6 w-full flex justify-center items-center mb-4 mt-4'>
            <div className='bg-white[#D9D9D9] rounded-lg h-16 w-16 flex justify-center items-center'>
                <Icon className='w-8 h-8 !text-black'/>
            </div>
        </div>
        <div className='text-black text-center w-full h-full  '>
            <h5 className="mb-2 lg:text-2xl font-bold">{title}</h5>
            <p>{description}</p>

        </div>
    </div> 
  )
}

export default MainInfoCard