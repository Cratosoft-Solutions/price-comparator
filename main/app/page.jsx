"use client";
import Link from "next/link";
const Home = () => {
  return (
    <section className="mx-auto mb-10 px-2.5 text-center sm:px-0 ">
        <h1 className="w-full mt-5 font-display text-4xl font-bold	 leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
            Busca El Mejor Precio
            <br />
            <span className="orange_gradient text-center">En Solo Un Lugar</span>
        </h1>
        <p className="desc text-center">
            Cratosoft Price Comparator, te ayuda en la búsqueda de la mejor opción para obtener tu producto o servicio Soñado.
        </p>
        <Link href="/search" className="black_btn mx-auto mt-10 flex max-w-fit space-x-4" onClick={()=>{console.log("me llamaron")}}>Iniciar búsqueda</Link>
    </section>
  )
}

export default Home