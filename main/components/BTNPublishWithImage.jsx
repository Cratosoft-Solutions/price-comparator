import React from 'react';
import BTNPublish from './BTNPublish';

const BTNPublishWithImage  = () => {

  return (
    <div className="bg-[#EEDECF]  w-full h-fit grid grid-cols-1 grid-rows-1 md:grid-cols-[65%_35%] border border-gray-100 ">
      <div className="h-fit bg-[#EEDECF]  flex items-center">
        <div className="text-black mb-4 md:mb-0 p-4 md:p-14 h-fit w-full justify-center">
          <p className="font-black text-2xl md:text-5xl mb-4 w-full text-center md:text-left">
            ¡Crea tu anuncio!
          </p>
          <p className="font-black text-2xl md:text-4xl mb-4 w-full text-center md:text-left">
            Fácil y sencillo.
          </p>
          <p className="text-gray-800 w-full text-center md:text-left">
            Maximiza tus ingresos al publicar los servicios que ofreces en
            nuestra plataforma. Deja que el mundo conozca tus habilidades y
            genera ingresos al mismo tiempo!{" "}
          </p>
          <div className="flex w-full justify-center md:justify-start mt-4">
            <BTNPublish/>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-left w-full h-fit bg-[#EEDECF]  p-14 ">
        <img className="w-1/2 h-fit " src="/assets/images/create-item2.svg" />
      </div>
    </div>
  );
}

export default BTNPublishWithImage 