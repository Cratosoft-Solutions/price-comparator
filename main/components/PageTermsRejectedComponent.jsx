"use client";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import { IoHandRightOutline } from "react-icons/io5";

const TermsRejected = () => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callBackUrl") || "/";

  return (
    <div className="bg-dark-bg min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-8 lg:p-10">
          <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mx-auto mb-6">
            <IoHandRightOutline className="w-8 h-8 text-accent-glow" />
          </div>
          <h2 className="text-dark-text font-bold text-2xl lg:text-3xl mb-3">
            ¡Gracias por tu visita!
          </h2>
          <p className="text-dark-muted text-sm lg:text-base leading-relaxed mb-6">
            Respetamos tu decisión. Esperamos tu próxima visita.
          </p>
          <Link
            href={callBackUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-glow text-white text-sm font-bold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300"
          >
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsRejected;
