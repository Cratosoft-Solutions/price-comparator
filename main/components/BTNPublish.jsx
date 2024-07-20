import React from 'react'
import Link from 'next/link';

const BTNPublish = () => {

  return (
        <Link href="/create/item?type=product" className='relative black_btn_sqr'>
            <div className='absolute rounded-full bg-black  animate-ping h-4 w-4 -top-1 -right-1 '></div>
            Publicar mi anuncio
        </Link>
  )
} 

export default BTNPublish