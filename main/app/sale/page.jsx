"use client"
import HorizontalSlider from "@components/HorizontalSlider"

/* export const metadata = {
  title: "EncuéntraLo Fácil CR: Login",
  description: "EncuéntraLo Fácil CR, ingresa para estar al tanto de nuevos productos, bienes, casas, autos u otros preferidos. O bien para tener tu propia tienda y publicarlos!",
}; */

const Sale = () => {
  return (
    <>
      <HorizontalSlider />
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 p-6 ml-10 mt-4 mb-4 mr-10 ">
        <h2 className="text-4xl font-extrabold text-black mb-4 ">
          Únete a Encuéntralo Fácil CR y lleva tu negocio al siguiente nivel{" "}
        </h2>
        <p className="text-gray-800 text-lg font-semibold leading-relaxed px-0 py-2  bg-white text-center lg:text-left">
          ¿Estás listo para transformar tu negocio y alcanzar nuevas alturas?
          Con Encuéntralo Fácil CR, tienes la oportunidad perfecta para hacerlo.
          Nuestra plataforma, desarrollada por ingenieros costarricenses, es la
          herramienta definitiva para exhibir tus productos a una audiencia
          global. Aquí, puedes llegar a nuevos clientes y aumentar tus ventas de
          manera significativa.
        </p>
        <div class="flex w-full justify-center lg:justify-start mt-4">
          <a class="relative black_btn_sqr" href="/create/item?type=product">
            <div class="absolute rounded-full bg-black  animate-ping h-4 w-4 -top-1 -right-1 "></div>
            Publicar mi anuncio
          </a>
        </div>
      </div>
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 pt-0 p-6 ml-10 mt-2 mb-4 mr-10">
        <h2 className="text-4xl font-extrabold text-black mb-4 ">
          ¿Por qué Elegir Encuéntralo Fácil CR?
        </h2>
        <ul className="list-disc ml-10 gap-2 text-justify text-gray-800 text-lg font-semibold leading-relaxed px-0 py-2  bg-white lg:text-left">
          <li key={1} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Fácil de Usar:</p>Nuestra
              plataforma está diseñada pensando en ti. Es intuitiva y fácil de
              navegar, permitiéndote publicar y gestionar tus productos sin
              complicaciones.
            </p>
          </li>
          <li key={2} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Audiencia Nacional: </p>Con
              Encuéntralo Fácil CR, tus productos estarán visibles para
              compradores de todo el país.
            </p>
          </li>
          <li key={3} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Incremento en Ventas: </p>Más
              visibilidad significa más oportunidades de venta. Atrae a una base
              de clientes más amplia y diversificada.
            </p>
          </li>
          <li key={4} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Soporte Local: </p>Disfruta del
              respaldo de un equipo local que entiende tus necesidades y está
              dispuesto a ayudarte en cada paso del camino.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sale