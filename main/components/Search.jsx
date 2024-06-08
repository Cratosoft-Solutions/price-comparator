"use client";
import React from "react";
import SearchButton from "./SearchButton";
import { useSelector } from "react-redux";
import Loading from "@app/loading";
import { Helmet } from "react-helmet";


const Search = () => {
const {loading} = useSelector(state => state.siteloading);

<Helmet>
<meta charSet="utf-8" />
<title>Encuéntralo Fácil CR</title>
<link rel="canonical" href="https://www.encuentralofacilcr.com" />
<meta
  name="Encuéntralo Fácil CR"
  content="tu destino en línea para descubrir una amplia variedad de bienes y servicios en Costa Rica"
/>
</Helmet>

if(loading)
  return <Loading message ="Cargando"/>
  
  return (
        <section 
        className="grid grid-cols-1 grid-rows-1 w-full w-full gap-2 bg-cover bg-no-repeat "
        style= {{backgroundImage: "url('./assets/images/ecommerce2.png')"}}
        >
          <h1 className="flex w-full justify-center font-bold p-4 h-32">
            <span className="orange_gradient text-center text-4xl lg:text-7xl">
              Compara y elige el mejor precio 
            </span>
          </h1>
          <div className="flex w-full justify-center mt-2">
            <SearchButton />
          </div>
        </section>
  );
};

export default Search;
