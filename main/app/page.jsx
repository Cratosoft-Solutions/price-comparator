"use client";
import Link from "next/link";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Encuéntralo Fácil CR</title>
        <link rel="canonical" href="https://www.encuentralofacilcr.com" />
        <meta
          name="Encuéntralo Fácil CR"
          content="tu destino en línea para descubrir una amplia variedad de bienes y servicios en Costa Rica"
        />
      </Helmet>
      <section className="mx-auto mb-10 px-2.5 text-center sm:px-0 ">
        <h1 className="w-full mt-5 font-display text-4xl font-bold	 leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
          Encuentralo Fácil CR 
          <br />
          <span className="orange_gradient text-center">Busca el mejor precio</span>
        </h1>
        <p className="desc text-center">
          Encuéntralo fácil CR es tu destino en línea para descubrir una amplia variedad de bienes y servicios en Costa Rica.
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
