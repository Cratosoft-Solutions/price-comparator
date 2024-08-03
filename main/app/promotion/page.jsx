/* const { default: PageLoginComponent } = require("@components/PageLoginComponent") */
"use client"
import HorizontalSlider from "@components/HorizontalSlider"
import MainPageInformationTab from "@components/MainPageInformationTab";
import { MAIN_STYLES } from "@utils/constants";

/* export const metadata = {
  title: "EncuéntraLo Fácil CR: Login",
  description: "EncuéntraLo Fácil CR, ingresa para estar al tanto de nuevos productos, bienes, casas, autos u otros preferidos. O bien para tener tu propia tienda y publicarlos!",
}; */

const Promotion = () => {
  return (
    <>
      <HorizontalSlider />
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 p-6 ml-10 mt-4 mb-4 mr-10 ">
        <h2 className="text-4xl font-extrabold text-black mb-4 ">
          ¿Quieres que tu sitio web destaque entre la multitud?
        </h2>
        <p className="text-gray-800 text-lg font-semibold leading-relaxed px-0 py-2  bg-white text-center lg:text-left">
          ¡Es tu momento de brillar! Promociona tu página web y permite que el mundo descubra lo que tienes para ofrecer. Con nuestra ayuda, puedes aumentar significativamente la visibilidad de tu sitio y alcanzar a un público más amplio que comparta tu pasión. ¡Haz que tu presencia en línea sea inolvidable y deja una huella imborrable en el mundo digital!
        </p>
        <p className="text-gray-800 text-lg font-semibold leading-relaxed px-0 py-2  bg-white text-center lg:text-left">
        Nuestra estrategia integral incluye una variedad de servicios diseñados para impulsar tu sitio web hacia el éxito. Desde optimización en motores de búsqueda (SEO) hasta campañas de marketing en redes sociales, nos aseguramos de que tu página alcance a la audiencia adecuada en el momento adecuado.
        </p>
      </div>
      <MainPageInformationTab propertiesToBeRendered={MAIN_STYLES.MAIN_PAGE.CREATE_PRODUCT_TAB}/>
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 p-6 ml-10 mt-4 mb-4 mr-10 ">
      <h2 className="text-4xl font-extrabold text-black mb-4 ">
        Beneficios de unirte a Encuéntralo Fácil CR 
        </h2>
        <ul className="list-disc ml-10 gap-2 text-justify text-gray-800 text-lg font-semibold leading-relaxed px-0 py-2  bg-white lg:text-left">
          <li key={1} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Exhibición de Productos:</p> Muestra tus productos con descripciones detalladas y fotos de alta calidad para captar la atención de los clientes.

            </p>
          </li>
          <li key={2} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Optimización para Motores de Búsqueda: </p>Nuestro sitio está optimizado para motores de búsqueda, asegurando que tus productos sean fácilmente encontrados por compradores potenciales.
            </p>
          </li>
          <li key={3} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Gestión de Inventario:  </p>Mantén tu inventario actualizado y administra tus productos de manera eficiente con nuestras herramientas de gestión.
            </p>
          </li>
          <li key={4} className="mb-2">
            <p className="inline">
              <p className="inline font-black">Seguridad y Confiabilidad:  </p>Tu negocio y tus datos están seguros con nosotros. Implementamos las mejores prácticas de seguridad para proteger tu información.
            </p>
          </li>
        </ul>
      </div>
      
    </>
  );
}

export default Promotion