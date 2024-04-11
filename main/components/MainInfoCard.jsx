import React from 'react';

const MainInfoCard = ({Icon, title, description}) => {
  return (
    <div className='w-full p-4 relative mb-4'>
        <div className='absolute -top-2 w-full flex justify-center items-center'>
            <div className='bg-black rounded-lg h-16 w-16 flex justify-center items-center'>
                <Icon className='w-8 h-8' color='white'/>
            </div>
        </div>
        <div className='text-center w-full h-52 rounded-lg bg-[#D9D9D9] hover:shadow-[3px_3px_3px_3px_rgba(0.3,0.3,0.3,0.3)] pt-16 pl-2 pr-2 md:pl-8 md:pr-8 justify-center'>
            <h5 className="mb-2 md:text-2xl font-bold">{title}</h5>
            <p>{description}</p>

        </div>
    </div> 
  )
}

export default MainInfoCard