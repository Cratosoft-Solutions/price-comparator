import React from 'react'
import { useRouter } from 'next/navigation';

const BTNPublish = () => {
  const router = useRouter();

  const onOptionSelected =(url)=>{
    router.push(url);
  }
  return (
        <button onClick={()=>{onOptionSelected("/create/item?type=product")}} className='relative black_btn_sqr'>
            <div className='absolute rounded-full bg-black  animate-ping h-4 w-4 -top-1 -right-1 '></div>
            Publicar mi anuncio
        </button>
  )
}

export default BTNPublish