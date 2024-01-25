"use client";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <section className="mx-auto mb-10 px-2.5 text-center sm:px-0 ">
        <h1 className="w-full mt-5 font-display text-4xl font-bold	 leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
          Encuentralo Fácil CR 
          <br />
          <span className="orange_gradient text-center">Busca el mejor precio</span>
        </h1>
        <p className="desc text-center">
        Descubre de manera sencilla y rápida una selección diversa de productos y servicios en EncuentraLoFácilCR. Desde autos hasta viviendas, abarrotes, artículos de segunda mano y una amplia variedad de servicios, nuestra plataforma te permite explorar y publicar lo que necesitas. Navega con facilidad, encuentra lo que buscas al alcance de un clic y, si lo deseas, publica tus propios productos y servicios. ¡Haz tus búsquedas más eficientes y experimenta la comodidad de Encuentralo Fácil CR!
        </p>
        <Link
          href="/search/newsearch"
          className="black_btn mx-auto mt-10 flex max-w-fit space-x-4"
          onClick={() => {
            console.log("me llamaron");
          }}
        >
          Iniciar búsqueda
        </Link>
      </section>
    </>
  );
};

export default Home;
