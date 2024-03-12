import React from 'react'

const SiteFooter = ({showOnNav}) => {
  return (
    <div className='w-full bg-[#D9D9D9] h-26 mt-auto grid grid-rows-3 justify-center p-2'>
      <div className='flex justify-center items-center'>
        <span className='font-black text-xl h-10 mt-8'>
          Encuéntralo Fácil
        </span>
      </div>
      <div className='grid grid-rows-2 grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 w-full'>
        <span className='w-full justify-center flex'>
          La Empresa
        </span>
        <span className='w-full justify-center flex'>
          Atención al cliente
        </span>
        <span className='w-full justify-center flex'>
          Publicidad
        </span>
        <span className='w-full justify-center flex'>
          Políticas de Privacidad
        </span>
      </div>
      <div className='flex justify-center w-full items-center'>
        <span className="w-full justify-center flex">
          @2024-2024  encuetralofacilcr.com / Todos los derechos reservados
        </span>
      </div>
    </div>
  )
}

export default SiteFooter