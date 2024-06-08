"use client"
import BTNPublish from "@components/BTNPublish";
import HorizontalSlider from "@components/HorizontalSlider"

/* export const metadata = {
  title: "EncuéntraLo Fácil CR: Login",
  description: "EncuéntraLo Fácil CR, ingresa para estar al tanto de nuevos productos, bienes, casas, autos u otros preferidos. O bien para tener tu propia tienda y publicarlos!",
}; */

const Sale = () => {
  return (
    <>
      <HorizontalSlider />
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 mt-4 mb-4">
        <h2 className="mt-1 font-black text-xl lg:text-2xl lg:h-12 text-black">
          Únete a Encuéntralo Fácil CR y lleva tu negocio al siguiente nivel{" "}
        </h2>
        <p className="text-base text-justify">
          ¿Estás listo para transformar tu negocio y alcanzar nuevas alturas?
          Con Encuéntralo Fácil CR, tienes la oportunidad perfecta para hacerlo.
          Nuestra plataforma, desarrollada por ingenieros costarricenses, es la
          herramienta definitiva para exhibir tus productos a una audiencia
          global. Aquí, puedes llegar a nuevos clientes y aumentar tus ventas de
          manera significativa.
        </p>
      </div>
      <BTNPublish />
      <div className="grid  gap-y-4 mt-4 mb-4  text-black">
        <h2 className="mt-1 font-black text-base text-black">
          ¿Por qué Elegir Encuéntralo Fácil CR?
        </h2>
        <ul className="list-disc ml-10 gap-2 text-justify" >
          <li key={1} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Fácil de Usar:</p>Nuestra plataforma está diseñada pensando en ti. Es intuitiva y fácil de navegar, permitiéndote publicar y gestionar tus productos sin complicaciones.
            </p>
          </li>
          <li key={2} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Audiencia Nacional: </p>Con Encuéntralo Fácil CR, tus productos estarán visibles para compradores de todo el país.
            </p>
          </li>
          <li key={3} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Incremento en Ventas: </p>Más visibilidad significa más oportunidades de venta. Atrae a una base de clientes más amplia y diversificada.
            </p>
          </li>
          <li key={4} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Soporte Local: </p>Disfruta del respaldo de un equipo local que entiende tus necesidades y está dispuesto a ayudarte en cada paso del camino.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sale