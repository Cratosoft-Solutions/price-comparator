import { setSearchOption } from "@app/redux/slices/configOptions";
import React from "react";
import { useDispatch } from "react-redux";
import { GoSearch } from "react-icons/go";

const ShowAllResults = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex w-full justify-center items-center mt-10 px-4">
      <div className="rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-6 lg:p-8 text-center max-w-md w-full">
        <div className="w-12 h-12 rounded-xl bg-dark-elevated/80 border border-dark-border/30 flex items-center justify-center mx-auto mb-4">
          <GoSearch className="w-5 h-5 text-dark-muted" />
        </div>
        <p className="text-dark-muted text-sm mb-4">
          No se encontraron productos con coincidencia exacta.
        </p>
        <button
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-glow text-white text-sm font-bold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300"
          onClick={() => {
            dispatch(setSearchOption("MATCH"));
          }}
        >
          Ver todos los resultados
        </button>
      </div>
    </div>
  );
};

export default ShowAllResults;
